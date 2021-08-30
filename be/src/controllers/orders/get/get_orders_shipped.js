import db from '../../../util/db.js';
import logger from '../../../util/logging.js';

export default async (req, res) => {
  logger(req);

  try {
    const data = await db
      .query(
        `
        select * from orders
          where (product_code like 'EA%' or product_code like 'ETA%' or product_code like 'LS%') 
          and 
          order_status != 'Processing'
          and 
          order_status != 'New - See Order Notes'
          and 
          order_status != 'Partially Shipped'
          and
          order_status != 'Cancelled' 
          and 
          order_status != 'Returned'
          order by order_id, order_detail_id;
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