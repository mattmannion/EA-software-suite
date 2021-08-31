import { Request, Response } from 'express';
import db from '../../util/db.js';
import { login_query } from '../../sql/authentication/authentication_queries';
import logger from '../../util/logging.js';

export default async function login(req: Request, res: Response) {
  logger(req);

  try {
    const data = await db
      .query(login_query, [req.body.username, req.body.password])
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));

    if (data)
      res.status(200).json({
        status: 'logged in',
        data,
      });
    else
      res.status(204).json({
        status: 'login failed',
      });
  } catch (error) {
    console.log(error);
  }
}
