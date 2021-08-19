import db from '../../../db/db.js';
import fetch from 'node-fetch';
import xml2js from 'xml2js';
import logger from '../../../util/logger.js';
import timer from '../../../util/timer.js';

export default async (req, res) => {
  logger(req);

  try {
    const vol_query = await db
      .query(
        `
        select order_id from orders 
        where (product_code like 'EA%' or product_code like 'ETA%' or product_code like 'LS%' ) 
        and
        order_status != 'Cancelled' 
        and 
        order_status != 'Shipped'
        and 
        order_status != 'Returned'
        group by order_id
        order by order_id;
      `
      )
      .then(res => res.rows)
      .catch(err => console.log(err.stack));

    const db_query = await db
      .query(
        `
        select order_id, order_detail_id from orders 
        where (product_code like 'EA%' or product_code like 'ETA%' or product_code like 'LS%' ) 
        and
        order_status != 'Cancelled' 
        and 
        order_status != 'Shipped'
        and 
        order_status != 'Returned'
        group by order_id, order_detail_id
        order by order_id, order_detail_id;
      `
      )
      .then(res => res.rows)
      .catch(err => console.log(err.stack));

    const db_tuple = db_query.map(({ order_id, order_detail_id }) => {
      return {
        order_id,
        order_detail_id,
      };
    });

    const MainLoop = async query_array => {
      try {
        const { order_id, order_detail_id } = query_array;

        const response = await fetch(
          `${process.env.insert_order_v2}${order_id}`
        );
        const { xmldata } = await xml2js.parseStringPromise(
          await response.text(),
          (err, res) => {
            if (err) return console.log(err);
            else return res;
          }
        );

        const { OrderStatus, OrderDetails } = xmldata.Orders[0];

        const data = OrderDetails.map(od => {
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
        console.log(data);
      } catch (err) {
        err;
      }
    };

    // start outer loop
    for (let index = 0; index < 5; index++) {
      // timer stops db overload
      timer(500);
      MainLoop(db_tuple[index]);

      if (index === db_tuple.length) console.log('loop done');
    } // end outer loop
    res.status(200).json({
      // data: query_array,
      status: 'success',
    });
    return;
  } catch (error) {
    console.log(error);
  }
};
