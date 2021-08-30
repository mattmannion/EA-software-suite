import db from '../../../util/db.js';
import logger from '../../../util/logger.js';

export default async (req, res) => {
  logger(req);
  console.log('here');

  try {
    const data = await db
      .query(
        `
        select * from orders order by order_id asc
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
