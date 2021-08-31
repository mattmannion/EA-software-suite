import { Request, Response } from 'express';
import { get_one_user_query } from '../../sql/users/users_queries';
import db from '../../util/db';
import logger from '../../util/logging';

export default async function get_one_user(req: Request, res: Response) {
  logger(req);

  try {
    const data = await db
      .query(get_one_user_query, [req.params.id])
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));

    res.status(200).json({
      data,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
}
