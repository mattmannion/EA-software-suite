import { Request, Response } from 'express';
import logger, { timer } from '../../../util/logging.js';
import create_order from '../../../logic/orders/insert/create_order.js';

const order_advance = 7700;
const last_order_id = 106702;

export default async (req: Request, res: Response) => {
  logger(req);

  res.status(200).json({
    status: 'success',
  });

  async function loop() {
    for (let id = last_order_id; id < last_order_id + order_advance + 1; id++) {
      console.log(id);
      await create_order(id)

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
