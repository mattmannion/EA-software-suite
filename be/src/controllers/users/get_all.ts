import { Request, Response } from 'express';
import { get_all_users_query } from '../../sql/users/users_queries.js';
import db from '../../util/db.js';
import logger from '../../util/logging.js';

export default async function get_all_users(req: Request, res: Response) {
  logger(req);

  try {
    const data = await db
      .query(get_all_users_query)
      .then(res => res.rows)
      .catch(err => console.log(err.stack));

    res.status(200).send({
      data,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
}
