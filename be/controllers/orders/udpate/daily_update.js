import db from '../../../db/db.js';
import fetch from 'node-fetch';
import xml2js from 'xml2js';
import logger from '../../../util/logger.js';
import timer from '../../../util/timer.js';

export default async (req, res) => {
  logger(req);

  try {
    const query = await db
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

    const query_array = query.map(({ order_id, order_detail_id }) => {
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
          { explicitArray: false },
          (err, res) => {
            if (err) return console.log(err);
            else return res;
          }
        );
        const data = xmldata.Orders;

        console.log(data);

        res.status(200).json({
          data,
          status: 'success',
        });
        return;
        query_string;
        const query = `
          insert into orders (
            order_id,
            order_date,
            order_status,
            order_detail_id,
            order_option,
            order_option_id,
            full_name,
            shipped,
            product_name,
            product_code,
            notes,
            pallet,
            tack,
            assembled,
            completed,
            last_mod
            )
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
          returning *;
        `;
        // checks for data inside response to volusion
        if (data === null || data === undefined) {
          // console.log(data);
          res.status(200).json({
            status: 'no data',
          });
          return;
          // end if
        } else if (data !== null || data !== undefined) {
          // base query values
          let {
            OrderID,
            OrderDate,
            OrderStatus,
            BillingFirstName,
            BillingLastName,
            Shipped,
          } = data;
          const full_name = BillingFirstName + ' ' + BillingLastName;
          const notes = '';
          const pallet = '';
          const tack = '';
          const assembled = '';
          const completed = '';
          const dod = data.OrderDetails;
          if (Shipped === undefined) Shipped = 'N';
          OrderDate = OrderDate.split(' ')[0];
          // insert into orders by mapping over order details
          // and filling in needed parent details
          if (Array.isArray(dod)) {
            const queryMap = dod.map(
              ({
                OrderDetailID,
                OptionIDs,
                Options,
                ProductName,
                ProductCode,
                LastModified,
              }) => {
                return [
                  OrderID, // 1
                  OrderDate, // 2
                  OrderStatus, // 3
                  OrderDetailID, // 4
                  Options, // 5
                  OptionIDs, // 6
                  full_name, // 7
                  Shipped, // 8
                  ProductName, // 9
                  ProductCode, // 10
                  notes, // 11
                  pallet, // 12
                  tack, // 13
                  assembled, // 14
                  completed, // 15
                  LastModified, // 16
                ];
              }
            );
            for (let i = 0; i < queryMap.length; i++) {
              // timer stops db overload
              await timer(500);
              db.query(query, queryMap[i])
                .then(res => {
                  return res.rows[0];
                })
                .catch(err => console.log(err.stack));
            }
            // end if
          } else {
            // base values
            const {
              OrderDetailID,
              OptionIDs,
              Options,
              ProductName,
              ProductCode,
              LastModified,
            } = dod;
            db.query(query, [
              OrderID,
              OrderDate,
              OrderStatus,
              OrderDetailID,
              Options,
              OptionIDs,
              full_name,
              Shipped,
              ProductName,
              ProductCode,
              notes,
              pallet,
              tack,
              assembled,
              completed,
              LastModified,
            ])
              .then(res => res.rows[0])
              .catch(err => console.log(err.stack));
            // end else
          }
          res.status(200).json({
            status: 'success',
          });
          return;
          // end else if
        } else {
          res.status(400).json({
            status: 'something went wrong...',
          });
          return;
        }
      } catch (err) {
        err;
      }
    };

    // start outer loop
    for (let index = 0; index < 1; index++) {
      // timer stops db overload
      // await timer(500);
      // console.log(query_array[index]);
      MainLoop(query_array[index]);

      if (index === query_array.length) console.log('loop done');
    } // end outer loop
  } catch (error) {
    console.log(error);
  }
};
