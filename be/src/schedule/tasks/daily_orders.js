import db from '../../util/db.js';
import fetch from 'node-fetch';
import xml2js from 'xml2js';
import { time_stamp } from '../../util/logger.js';
import timer from '../../util/timer.js';
import query_filter from '../../controllers/orders/logic/insert/query_filter.js';
import duplicate from '../../controllers/orders/logic/insert/duplicate.js';

let order_advance = 55;
let last_order_id;
export default async () => {
  time_stamp();

  try {
    let { order_id } = await db
      .query(
        `
      select order_id from orders
      order by order_id desc limit 1;
    `
      )
      .then(res => {
        return res.rows[0];
      })
      .catch(err => console.log(err.stack));

    last_order_id = +order_id + 1;
  } catch (error) {
    console.log(error);
  }

  const MainLoop = async id => {
    try {
      let response = await fetch(`${process.env.insert_order_v3}${id}`);

      let { xmldata } = await xml2js.parseStringPromise(
        await response.text(),
        (err, res) => {
          if (err) return console.log(err);
          else return res;
        }
      );

      let data_array = xmldata.Orders;

      let data_filter = await query_filter(data_array);

      await duplicate(data_filter);
    } catch (err) {
      err;
    }
  };

  async function testloop() {
    console.log(last_order_id);
    await MainLoop(last_order_id);
  }

  async function loop() {
    for (let id = last_order_id; id < last_order_id + order_advance + 1; id++) {
      console.log(id);
      await MainLoop(id);

      // timer stops db overload
      await timer(200);
      if (id === last_order_id + order_advance) console.log('insert loop done');
    }
  }

  // await testloop();
  await loop();
};
