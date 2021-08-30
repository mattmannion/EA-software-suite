import db from '../../db.js';
import { timer, time_stamp } from '../../logging.js';
import query_filter from '../../../logic/orders/insert/query_filter.js';
import duplicate from '../../../logic/orders/insert/duplicate.js';
import volusion_fetch from '../../../logic/general/volusion_fetch.js';
import { find_last_order_query } from '../../../sql/orders/insert/insert_orders_query.js';

let order_advance = 55;
let last_order_id = 0;
export default async () => {
  time_stamp();

  try {
    let { order_id } = await db
      .query(find_last_order_query)
      .then(res => {
        return res.rows[0];
      })
      .catch(err => console.log(err.stack));

    last_order_id = +order_id + 1;
  } catch (error) {
    console.log(error);
  }

  const MainLoop = async (id: number) => {
    try {
      let data_array = await volusion_fetch(id);

      let data_filter = await query_filter(data_array);

      await duplicate(data_filter);
    } catch (err) {
      err;
    }
  };

  async function loop() {
    for (let id = last_order_id; id < last_order_id + order_advance + 1; id++) {
      console.log(id);
      await MainLoop(id);

      // timer stops db overload
      await timer(250);
      if (id === last_order_id + order_advance) console.log('insert loop done');
    }
  }
  await loop();

  // async function testloop() {
  //   console.log(last_order_id);
  //   await MainLoop(last_order_id);
  // }
  // await testloop();
};
