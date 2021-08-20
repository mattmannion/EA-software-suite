import db from '../../db/db.js';
import logger from '../../util/logger.js';

export default async (req, res) => {
  logger(req);

  try {
    const data = await db
      .query(
        `
        select * from users order by id
      `
      )
      .then(res => res.rows)
      .catch(err => console.log(err.stack));

    res.status(200).send({
      data,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
