import { Request, Response } from 'express';
import db from '../../util/db';
import { login_query } from '../../sql/authentication/authentication_queries';
import logger from '../../util/logging';

export default async function login(req: Request, res: Response) {
  logger(req);

  try {
    const { body, session } = req;

    const data = await db
      .query(login_query, [body.username, body.password])
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));
    if (!data)
      return res.status(401).json({
        status: 'wrong username or password',
      });

    if (session.username || session.permissions)
      return res.status(409).json({
        status: 'already logged in',
      });

    session.username = data.username;
    session.permissions = [data.permissions];

    return res.status(200).json({
      username: session.username,
      permissions: session.permissions,
      status: 'logged in',
    });
  } catch (error) {
    return console.log(error);
  }
}
