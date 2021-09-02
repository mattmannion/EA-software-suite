import { filter_object } from '../../../../types/logic/orders/insert/duplicate.js';
import { insert_new_db_query } from '../../../sql/orders/insert/insert_order_queries.js';
import db from '../../../util/db.js';
import { timer } from '../../../util/logging.js';

export default async function dupliate_items(data_filter: filter_object[]) {
  try {
    let query_array: filter_object[] = [];

    const dup_loop = async (data: filter_object[], array: filter_object[]) => {
      if (data)
        data.forEach(data => {
          let num_of_items = parseInt(data.product_qt);
          for (let i = 0; i < num_of_items; i++) {
            array.push(data);
          }
        });
      else return;
    };

    if (Array.isArray(data_filter)) await dup_loop(data_filter, query_array);
    else return console.log('Data format not of type array');

    // holds built query
    for (let i = 0; i < query_array.length; i++) {
      await db
        .query(insert_new_db_query, [
          query_array[i].order_id,
          query_array[i].order_date,
          query_array[i].order_status,
          query_array[i].order_detail_id,
          query_array[i].order_options,
          query_array[i].order_option_ids,
          query_array[i].cust_id,
          query_array[i].full_name,
          query_array[i].phone_number,
          query_array[i].product_name,
          query_array[i].product_code,
          query_array[i].product_qt,
          query_array[i].notes,
          query_array[i].pallet,
          query_array[i].tack,
          query_array[i].assembled,
          query_array[i].completed,
          query_array[i].ship_country,
          query_array[i].ship_state,
          query_array[i].ship_city,
          query_array[i].ship_address,
          query_array[i].ship_postal_code,
          query_array[i].tracking,
          query_array[i].payment_amount,
          query_array[i].payment_method_id,
        ])
        .catch(err => console.log(err));
      await timer(250);
    }
  } catch (err) {
    console.log(err);
  }
}
