import { Request, Response } from 'express';
import { update_completed } from '../../../../sql/orders/update/update_queries';
import db from '../../../../util/db';
import logger from '../../../../util/logging';

export default async (req: Request, res: Response) => {
  logger(req);

  try {
    const { id, o_id, od_id } = req.params;
    const { body } = req.body;

    const data = await db
      .query(update_completed, [id, o_id, od_id, body])
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));

    if (data) {
      res.status(201).json({
        data,
        status: 'updated completed status',
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
