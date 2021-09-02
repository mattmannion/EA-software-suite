import { Request, Response } from 'express';
import db from '../../util/db';
import { login_query } from '../../sql/authentication/authentication_queries';
import logger from '../../util/logging';

export default async function login(req: Request, res: Response) {
  logger(req);

  try {
    const { body, session: sess } = req;

    const data = await db
      .query(login_query, [body.username, body.password])
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));

    if (sess.username || sess.permissions)
      return res.status(409).json({
        status: 'already logged in',
      });

    sess.username = data.username;
    sess.permissions = [data.permissions];

    if (data)
      return res.status(200).json({
        username: sess.username,
        permissions: sess.permissions,
        status: 'logged in',
      });
    else
      return res.status(204).json({
        status: 'login failed',
      });
  } catch (error) {
    return console.log(error);
  }
}
