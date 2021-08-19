import db from '../../db/db.js';
import fetch from 'node-fetch';
import xml2js from 'xml2js';
import { time_stamp } from '../../util/logger.js';

// this is a complicated function, please look over it carefully
export default async () => {
  time_stamp();

  try {
    // volusion fetch
    const volusion = await fetch(`${process.env.insert_order_v2}${o_id}`);

    const { xmldata } = await xml2js.parseStringPromise(
      await volusion.text(),
      (err, res) => {
        if (err) return console.log(err);
        else return res;
      }
    );

    const vol_data = xmldata.Orders[0];
    const { OrderID, OrderStatus } = vol_data;

    // all data is served in single element arrays for some reason
    // [0] to extract the element from array format
    // fr means filtered result
    const fr = vol_data.OrderDetails.map(od => {
      let order_id = OrderID !== undefined ? OrderID[0] : '';
      let order_detail_id =
        od.OrderDetailID !== undefined ? od.OrderDetailID[0] : '';
      let product_name = od.ProductName !== undefined ? od.ProductName[0] : '';
      let product_code = od.ProductCode !== undefined ? od.ProductCode[0] : '';
      let order_status = OrderStatus !== undefined ? OrderStatus[0] : '';
      let order_option = od.Options !== undefined ? od.Options[0] : '';
      let order_option_id = od.OptionIDs !== undefined ? od.OptionIDs[0] : '';

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
      ({ order_id, order_detail_id }) =>
        order_id === o_id && order_detail_id === od_id
    )[0];

    const {
      order_id,
      order_detail_id,
      product_name,
      product_code,
      order_status,
      order_option,
      order_option_id,
    } = fr;

    const data = await db
      .query(
        `
        update orders set product_name = $3, product_code = $4,
        order_status = $5, order_option = $6, order_option_id = $7
        where order_id = $1 and order_detail_id = $2
        returning *;
      `,
        [
          order_id,
          order_detail_id,
          product_name,
          product_code,
          order_status,
          order_option,
          order_option_id,
        ]
      )
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));

    if (vol_data) {
      res.status(201).json({
        data,
        status: 'success',
      });
    } else {
      res.status(400).json({
        status: 'failure',
      });
    }
  } catch (error) {
    console.log(error);
  }
};
