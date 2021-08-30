import db from '../../../util/db.js';
import { select_filtered_orders } from '../../../sql/general/select_orders.js';
import logger, { timer } from '../../../util/logging.js';
import volusion_fetch from '../../../logic/general/volusion_fetch.js';
import { Request, Response } from 'express';
import {
  d_u_ep_data,
  OrderDetails_elments,
  query_element,
} from '../../../../types/controllers/orders/insert/update/daily_update_ep.js';

let db_tuple: void | any[] = [];

export default async (req: Request, res: Response) => {
  logger(req);

  try {
    const db_query = await db
      .query(select_filtered_orders)
      .then(res => res.rows)
      .catch(err => console.log(err.stack));

    if (Array.isArray(db_query))
      db_tuple = db_query.map(
        ({
          id,
          order_id,
          order_detail_id,
        }: {
          id: string;
          order_id: string;
          order_detail_id: string;
        }) => {
          return {
            id,
            order_id,
            order_detail_id,
          };
        }
      );
    else {
      res.status(500).json({
        status: 'db failure',
      });
      return;
    }

    //////////////////////////
    /// Start of Main Loop ///
    //////////////////////////
    const MainLoop = async (query_element: query_element) => {
      try {
        const { id, order_id, order_detail_id }: query_element = query_element;

        const data: d_u_ep_data = await volusion_fetch(id);

        const { OrderStatus, OrderDetails } = data[0];

        const vol_data = OrderDetails.map((od: OrderDetails_elments) => {
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
          f => f.order_id === order_id && f.order_detail_id === order_detail_id
        )[0];

        // parse volusion query
        const { product_name, product_code, order_option, order_status } =
          vol_data;

        // update query
        db.query(
          `
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

    res.status(200).json({
      // data: query_array,
      status: 'db updated started',
    });

    // start outer loop
    for (let i = 0; i < db_tuple.length; i++) {
      // timer stops db overload
      await timer(1000);
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
