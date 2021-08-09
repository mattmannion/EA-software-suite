import db from '../../db/db.js';
import fetch from 'node-fetch';
import xml2js from 'xml2js';
import logger from '../../logger/logger.js';

const timer = sec => new Promise(res => setTimeout(res, sec));

export default async (req, res) => {
  logger(req);

  const MainLoop = async id => {
    try {
      let response = await fetch(
        // `${process.env.xml_server}${process.env.insert_order}${1002}`
        `${process.env.xml_server}${process.env.insert_order}${id}`
      );

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
          full_name,
          shipped,
          product_name,
          product_code,
          notes,
          pallet,
          tack,
          assembled,
          completed
          )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
        // console.log(data);

        // base query values
        let { OrderID, OrderDate, BillingFirstName, BillingLastName, Shipped } =
          data;

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
          const queryMap = dod.map(({ ProductName, ProductCode }) => {
            return [
              OrderID,
              OrderDate,
              full_name,
              Shipped,
              ProductName,
              ProductCode,
              notes,
              pallet,
              tack,
              assembled,
              completed,
            ];
          });

          for (let i = 0; i < queryMap.length; i++) {
            // timer stops db overload
            await timer(500);
            db.query(
              query,
              queryMap[i]
              // last 4 '' just set the column to an empty string
              // to be filled in later on the front end
            )
              .then(res => {
                return res.rows[0];
              })
              .catch(err => console.log(err.stack));
          }
          // end if
        } else {
          // base values
          const { ProductName, ProductCode } = dod;
          db.query(
            query,
            [
              OrderID, // $1
              OrderDate.split(' ')[0], // $2
              BillingFirstName + ' ' + BillingLastName, // $3
              Shipped, // $4
              ProductName, // $5
              ProductCode, // $6
              notes, // $7
              pallet, // $8
              tack, // $9
              assembled, // $10
              completed,
            ]
            // last 4 '' just set the column to an empty string
            // to be filled in later on the front end
          )
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

  let last_id = 113568;

  // start outer loop
  for (let id = 113520; id < last_id + 1; id++) {
    // timer stops db overload
    await timer(3000);
    console.log(id);
    MainLoop(id);
  } // end outer loop
};
