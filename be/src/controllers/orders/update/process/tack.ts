import { Request, Response } from 'express';
import { update_tack } from '../../../../sql/orders/update/update_queries.js';
import db from '../../../../util/db.js';
import logger from '../../../../util/logging.js';

export default async (req: Request, res: Response) => {
  logger(req);

  try {
    const { id, o_id, od_id } = req.params;
    const { body } = req.body;

    const data = await db
      .query(update_tack, [id, o_id, od_id, body])
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));

    if (data) {
      res.status(201).json({
        data,
        status: 'updated tacked status',
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
