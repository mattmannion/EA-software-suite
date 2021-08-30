import { Request, Response } from 'express';
import { update_orders_query } from '../../../sql/orders/update/update_queries.js';
import db from '../../../util/db.js';
import logger from '../../../util/logging.js';

export default async (req: Request, res: Response) => {
  logger(req);

  try {
    const { id, o_id, od_id } = req.params;
    const { notes } = req.body;

    // select notes from orders
    const data = await db
      .query(update_orders_query, [id, o_id, od_id, notes])
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));

    if (data) {
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
