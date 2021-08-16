import db from '../../db/db.js';
import logger from '../../util/logger.js';

export default async (req, res) => {
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
      .query(
        `
      insert into users (first_name, last_name, email, password, username, permissions, confirmed)
      values ($1, $2, $3, $4, $5, $6, $7)
      returning *;
      `,
        [
          first_name,
          last_name,
          email,
          password,
          username,
          permissions,
          confirmed,
        ]
      )
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
};
