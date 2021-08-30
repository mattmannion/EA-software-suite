import db from '../../../../util/db.js';
import logger from '../../../../util/logging.js';

export default async (req, res) => {
  logger(req);

  try {
    const { id, o_id, od_id } = req.params;
    const { body } = req.body;

    const data = await db
      .query(
        `
        update orders set assembled = $4
        where id = $1 and order_id = $2 and order_detail_id = $3
        returning assembled;
      `,
        [id, o_id, od_id, body]
      )
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));

    if (data) {
      res.status(201).json({
        data,
        status: 'updated assembled status',
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
