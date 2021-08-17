import db from '../../../db/db.js';
import logger from '../../../util/logger.js';

export default async (req, res) => {
  logger(req);

  try {
    const data = await db
      .query(
        `
        select * from orders
          where (product_code like 'EA%' or product_code like 'ETA%' or product_code like '%LS') 
          and 
          order_status != 'Processed'
          and 
          order_status != 'New - See Order Notes'
          and 
          order_status != 'Partially Shipped'
          and
          order_status != 'Cancelled' 
          and 
          order_status != 'Returned'
          order by order_id asc;
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
