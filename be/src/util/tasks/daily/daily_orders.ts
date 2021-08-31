import { timer, time_stamp } from '../../logging.js';
import create_order from '../../../logic/orders/insert/create_order.js';
import find_last_order from '../../../logic/orders/insert/find_last_order.js';

const order_advance = 55;
let last_order_id = 0;
export default async () => {
  time_stamp();

  last_order_id = await find_last_order(last_order_id);

  // try {
  //   let { order_id } = await db
  //     .query(find_last_order_query)
  //     .then(res => {
  //       return res.rows[0];
  //     })
  //     .catch(err => console.log(err.stack));

  //   last_order_id = +order_id + 1;
  // } catch (error) {
  //   console.log(error);
  // }

  async function loop() {
    for (let id = last_order_id; id < last_order_id + order_advance + 1; id++) {
      console.log(id);
      await create_order(id);

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
