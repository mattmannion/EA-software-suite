import db from '../../../util/db';
import { find_last_order_query } from '../../../sql/orders/insert/insert_order_queries';

export default async function find_last_order(last_order_id: number) {
  try {
    let { order_id } = await db
      .query(find_last_order_query)
      .then(res => {
        return res.rows[0];
      })
      .catch(err => console.log(err.stack));

    return (last_order_id = +order_id + 1);
  } catch (error) {
    console.log(error);
    return last_order_id;
  }
}
