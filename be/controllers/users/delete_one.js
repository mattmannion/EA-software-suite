import db from '../../db/db.js';
import logger from '../../logger/logger.js';

export default async (req, res) => {
  logger(req);

  try {
    const { id } = req.params;

    const data = await db
      .query(
        `
      delete from users where id = $1
      returning *;
      `,
        [id]
      )
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
};
