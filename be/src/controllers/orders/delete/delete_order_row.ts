import { Request, Response } from 'express';
import { delete_order_query } from '../../../sql/orders/delete/delete_order_queries';
import { get_order_by_row_id } from '../../../sql/orders/get/get_orders_queries';
import db from '../../../util/db';
import logger from '../../../util/logging';

export default async (req: Request, res: Response) => {
  logger(req);

  const { id } = req.params;

  try {
    //  id === table row id
    const data = await db.query(get_order_by_row_id, [id]);

    if (data) {
      await db.query(delete_order_query, [id]);
      res.status(202).json({
        status: 'order deleted',
      });
    } else
      res.status(203).json({
        status: 'no order found with that row id',
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'db failure',
    });
  }
};
