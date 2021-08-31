import { Request, Response } from 'express';
import logger, { timer } from '../../../util/logging';
import find_last_order from '../../../logic/orders/insert/find_last_order';
import create_order from '../../../logic/orders/insert/create_order';

let order_advance = 55;
let last_order_id = 0;
export default async (req: Request, res: Response) => {
  logger(req);

  last_order_id = await find_last_order(last_order_id);

  res.status(200).json({
    status: 'success',
  });

  async function loop() {
    for (let id = last_order_id; id < last_order_id + order_advance + 1; id++) {
      console.log(id);
      await create_order(id);

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
