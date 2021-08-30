import insert_new_db_query from '../../../sql/orders/insert/insert_new_db_query.js';
import db from '../../../util/db.js';
import timer from '../../../util/timer.js';

export default async function dupliate(data_filter) {
  try {
    let query_array = [];

    const dupliate_items = async (data, array) => {
      if (data)
        data.forEach(data => {
          let num_of_items = parseInt(data.product_qt);
          for (let i = 0; i < num_of_items; i++) {
            array.push(data);
          }
        });
      else return;
    };

    await dupliate_items(data_filter, query_array);

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
      await timer(200);
    }
  } catch (err) {
    console.log(err);
  }
}
