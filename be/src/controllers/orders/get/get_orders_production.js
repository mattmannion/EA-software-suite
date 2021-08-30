import db from '../../../util/db.js';
import logger from '../../../util/logger.js';

export default async (req, res) => {
  logger(req);

  try {
    const data = await db
      .query(
        `
        select id, order_date, order_id, full_name, order_options, 
        product_name, product_code, order_status, 
        completed, notes, pallet, tack, assembled, order_detail_id
          from orders
          where (product_code like 'EA%' or product_code like 'ETA%' or product_code like 'LS%') 
          and
          order_status != 'Cancelled' 
          and 
          order_status != 'Shipped'
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
