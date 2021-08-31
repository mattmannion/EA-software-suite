import { Request, Response } from 'express';
import { create_one_user_query } from '../../sql/users/users_queries.js';
import db from '../../util/db.js';
import logger from '../../util/logging.js';

export default async function create_one_user(req: Request, res: Response) {
  logger(req);

  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      permissions,
      confirmed,
    } = req.body;

    const data = await db
      .query(create_one_user_query, [
        first_name,
        last_name,
        email,
        password,
        username,
        permissions,
        confirmed,
      ])
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
}
