import { Request, Response } from 'express';
import { get_all_orders_query } from '../../../sql/orders/get/get_orders_queries';
import db from '../../../util/db';
import logger from '../../../util/logging';

export default async (req: Request, res: Response) => {
  logger(req);

  try {
    const data = await db
      .query(get_all_orders_query)
      .then(res => res.rows)
      .catch(err => console.log(err.stack));

    res.status(200).send({
      data,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
