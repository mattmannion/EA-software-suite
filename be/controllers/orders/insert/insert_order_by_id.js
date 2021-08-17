import db from '../../../db/db.js';
import fetch from 'node-fetch';
import xml2js from 'xml2js';
import logger from '../../../util/logger.js';
import timer from '../../../util/timer.js';

export default async (req, res) => {
  logger(req);

  const { id } = req.params;

  try {
    let response = await fetch(`${process.env.insert_order_v2}${id}`);

    let { xmldata } = await xml2js.parseStringPromise(
      await response.text(),
      { explicitArray: false },
      (err, res) => {
        if (err) return console.log(err);
        else return res;
      }
    );

    let { Orders: data } = xmldata;

    // query string
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
          await timer(1000);
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
