import db from '../../db/db.js';
import logger from '../../logger/logger.js';

export default async (req, res) => {
  logger(req);

  try {
    const data = await db
      .query(
        `
          select * from orders 
          where (product_code like 'EA%' or product_code like 'ETA%') 
          and shipped = 'Y' 
          order by order_id asc
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
