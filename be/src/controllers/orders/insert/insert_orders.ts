import { Request, Response } from 'express';
import db from '../../../util/db.js';
import logger from '../../../util/logger.js';
import volusion_fetch from '../../../logic/general/volusion_fetch.js';
import timer from '../../../util/timer.js';
import query_filter from '../../../logic/orders/insert/query_filter.js';
import duplicate from '../../../logic/orders/insert/duplicate.js';
import { find_last_order_query } from '../../../logic/queries/orders/insert/insert_orders_query.js';

let order_advance = 55;
let last_order_id = 0;
export default async (req: Request, res: Response) => {
  logger(req);

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
  res.status(200).json({
    status: 'success',
  });

  async function loop() {
    for (let id = last_order_id; id < last_order_id + order_advance + 1; id++) {
      console.log(id);
      await MainLoop(id);

      // timer stops db overload
      await timer(200);
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
