import db from '../../db/db.js';
import fetch from 'node-fetch';
import xml2js from 'xml2js';
import timer from '../../util/timer.js';

export default async () => {
  timer();

  try {
    const db_query = await db
      .query(
        `
        select id, order_id, order_detail_id from orders 
        where (product_code like 'EA%' or product_code like 'ETA%' or product_code like 'LS%' ) 
        and
        order_status != 'Cancelled' 
        and 
        order_status != 'Shipped'
        and 
        order_status != 'Returned'
        group by id, order_id, order_detail_id
        order by id, order_id, order_detail_id;
      `
      )
      .then(res => res.rows)
      .catch(err => console.log(err.stack));

    const db_tuple = db_query.map(({ id, order_id, order_detail_id }) => {
      return {
        id,
        order_id,
        order_detail_id,
      };
    });

    //////////////////////////
    /// Start of Main Loop ///
    //////////////////////////
    const MainLoop = async query_array => {
      try {
        const { id, order_id, order_detail_id } = query_array;

        // start volusion query
        const vol_query = await fetch(
          `${process.env.insert_order_v2}${order_id}`
        );
        const { xmldata } = await xml2js.parseStringPromise(
          await vol_query.text(),
          (err, res) => {
            if (err) return console.log(err);
            else return res;
          }
        );

        const { OrderStatus, OrderDetails } = xmldata.Orders[0];

        const vol_data = OrderDetails.map(od => {
          let order_detail_id =
            od.OrderDetailID !== undefined ? od.OrderDetailID[0] : '';
          let product_name =
            od.ProductName !== undefined ? od.ProductName[0] : '';
          let product_code =
            od.ProductCode !== undefined ? od.ProductCode[0] : '';
          let order_status = OrderStatus !== undefined ? OrderStatus[0] : '';
          let order_option = od.Options !== undefined ? od.Options[0] : '';
          let order_option_id =
            od.OptionIDs !== undefined ? od.OptionIDs[0] : '';

          return {
            order_id,
            order_detail_id,
            product_name,
            product_code,
            order_status,
            order_option,
            order_option_id,
          };
        }).filter(
          filter =>
            filter.order_id === order_id &&
            filter.order_detail_id === order_detail_id
        )[0];

        // parse volusion query
        const { product_name, product_code, order_option, order_status } =
          vol_data;

        // update query
        db.query(
          `
        update orders set
        product_name = $4,
        product_code = $5,
        order_option = $6,
        order_status = $7
        where id = $1 and order_id = $2 and order_detail_id = $3;
      `,
          [
            id,
            order_id,
            order_detail_id,
            product_name,
            product_code,
            order_option,
            order_status,
          ]
        )
          .then(res => res.rows)
          .catch(err => console.log(err.stack));

        //////////////////////
        /// Start of Error ///
        //////////////////////
      } catch (err) {
        err;
      }
    };

    // start outer loop
    for (let i = 0; i < db_tuple.length; i++) {
      // timer stops db overload
      await timer(2000);
      console.log(i + 1, db_tuple[i]);
      MainLoop(db_tuple[i]);

      if (i === db_tuple.length - 1)
        console.log('product info update complete');
    } // end outer loop
    return;
  } catch (error) {
    return console.log(error);
  }
};
