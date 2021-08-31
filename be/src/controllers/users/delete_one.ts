import { Request, Response } from 'express';
import { delete_one_user_query } from '../../sql/users/users_queries.js';
import db from '../../util/db.js';
import logger from '../../util/logging.js';

export default async function delete_one_user(req: Request, res: Response) {
  logger(req);

  try {
    const { id } = req.params;

    const data = await db
      .query(delete_one_user_query, [id])
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));
    if (data) {
      res.status(201).json({
        data: 'user deleted',
        status: 'success',
      });
    } else {
      res.status(400).json({
        status: 'failure, no users with that id found',
      });
    }
  } catch (error) {
    console.log(error);
  }
}
