import { Request, Response } from 'express';
import { update_notes } from '../../../sql/orders/update/update_queries';
import db from '../../../util/db';
import logger from '../../../util/logging';

export default async (req: Request, res: Response) => {
  logger(req);

  try {
    const { id } = req.params;
    const { notes } = req.body;

    // select notes from orders
    const data = await db
      .query(update_notes, [id, notes])
      .then((res) => res.rows[0])
      .catch((err) => console.log(err.stack));

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
