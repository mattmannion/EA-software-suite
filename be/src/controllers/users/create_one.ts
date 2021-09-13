import { Request, Response } from 'express';
import { create_one_user_query } from '../../sql/users/users_queries';
import db from '../../util/db';
import logger from '../../util/logging';
import bcrypt from 'bcryptjs';

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

    if (!password) return;
    const hashed_password = await bcrypt.hash(password, 12);

    const data = await db
      .query(create_one_user_query, [
        first_name,
        last_name,
        email,
        hashed_password,
        username,
        permissions,
        confirmed,
      ])
      .then((res) => res.rows[0])
      .catch((err) => console.log(err.stack));
    // const data = 'test';
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
