import { Request, Response } from 'express';
import { update_one_user_query } from '../../sql/users/users_queries';
import db from '../../util/db';
import logger from '../../util/logging';
import bcrypt from 'bcryptjs';

export default async function update_one_user(req: Request, res: Response) {
  logger(req);

  try {
    const { id } = req.params;

    const query = await db
      .query(update_one_user_query, [id])
      .then((res) => res.rows[0])
      .catch((err) => console.log(err.stack));

    let {
      first_name,
      last_name,
      email,
      password,
      username,
      permissions,
      confirmed,
    } = req.body;

    if (password) {
      password = await bcrypt.hash(password, 12);
    }

    if (!first_name) first_name = query.first_name as string;
    if (!last_name) last_name = query.last_name as string;
    if (!email) email = query.email as string;
    if (!password) password = query.password as string;
    if (!username) username = query.username as string;
    if (!permissions) permissions = query.permissions as string;
    if (!confirmed) confirmed = query.confirmed as string;

    const data = await db
      .query(
        `
        update users set first_name = $2, last_name = $3, email = $4, password = $5, username = $6, permissions = $7, confirmed = $8
        where id = $1
        returning *;
      `,
        [
          id,
          first_name,
          last_name,
          email,
          password,
          username,
          permissions,
          confirmed,
        ]
      )
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
}
