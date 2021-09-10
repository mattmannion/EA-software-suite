import { Request, Response } from 'express';
import db from '../../../util/db';
import logger from '../../../util/logging';
import volusion_fetch from '../../../logic/general/volusion_fetch';
import {
  OrderDetails_el_filter,
  OrderDetails_el_upd,
} from '../../../../types/controllers/orders/insert/update/update_item';
import { update_item_query } from '../../../sql/orders/update/update_queries';

// this is a complicated function, please look over it carefully
export default async (req: Request, res: Response) => {
  logger(req);

  try {
    const { id, o_id, od_id } = req.params;

    let vol_data = await volusion_fetch(o_id);

    let { OrderID, OrderStatus, OrderDetails } = vol_data[0];

    // all data is served in single element arrays for some reason
    // [0] to extract the element from array format
    // fr means filtered result
    let fr = await OrderDetails.map((od: OrderDetails_el_upd) => {
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
      ({ order_id, order_detail_id }: OrderDetails_el_filter) =>
        o_id === order_id && od_id === order_detail_id
    )[0];

    let {
      order_id,
      order_detail_id,
      product_name,
      product_code,
      order_status,
      order_option,
      order_option_id,
    } = fr;

    const data = await db
      .query(update_item_query, [
        id,
        order_id,
        order_detail_id,
        product_name,
        product_code,
        order_status,
        order_option,
        order_option_id,
      ])
      .then((res) => res.rows[0])
      .catch((err) => console.log(err.stack));

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
