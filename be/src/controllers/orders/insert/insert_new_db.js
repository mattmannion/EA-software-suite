import fetch from 'node-fetch';
import xml2js from 'xml2js';
import logger, { timer } from '../../../util/logging.js';
import dupliate from '../../../logic/orders/insert/duplicate.js';
import query_filter from '../../../logic/orders/insert/query_filter.js';

const order_advance = 7700;
// const order_advance = 0;
const last_order_id = 106702;

export default async (req, res) => {
  logger(req);

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

      await dupliate(query_filter(xmldata.Orders));
    } catch (err) {
      return console.log(err);
    }
  };

  res.status(200).json({
    status: 'success',
  });
  // test
  async function testloop() {
    console.log(last_order_id);
    await MainLoop(last_order_id);
  }

  async function loop() {
    for (let id = last_order_id; id < last_order_id + order_advance + 1; id++) {
      console.log(id);
      await MainLoop(id);

      // timer stops db overload
      await timer(250);
      if (id === last_order_id + order_advance) console.log('insert loop done');
    }
  }

  // await testLoop();
  await loop();
};
