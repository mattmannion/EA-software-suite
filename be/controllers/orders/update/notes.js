import db from '../../../db/db.js';
import logger from '../../../util/logger.js';

// this is a complicated function, please look over it carefully
export default async (req, res) => {
  logger(req);

  try {
    const { o_id, od_id } = req.params;
    const { notes } = req.body;

    // select notes from orders
    const data = await db
      .query(
        `
        update orders set notes = $3
        where order_id = $1 and order_detail_id = $2
        returning *;
      `,
        [o_id, od_id, notes]
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
