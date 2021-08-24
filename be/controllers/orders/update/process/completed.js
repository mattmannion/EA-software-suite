import db from '../../../../db/db.js';
import logger from '../../../../util/logger.js';

export default async (req, res) => {
  logger(req);

  try {
    const { o_id, od_id } = req.params;
    const { body } = req.body;

    const data = await db
      .query(
        `
        update orders set completed = $3
        where order_id = $1 and order_detail_id = $2
        returning completed;
      `,
        [o_id, od_id, body]
      )
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));

    if (data) {
      res.status(201).json({
        data,
        status: 'updated completed status',
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
