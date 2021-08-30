import fetch from 'node-fetch';
import xml2js from 'xml2js';

export default async function volusion_fetch(id) {
  let response = await fetch(`${process.env.insert_order_v3}${id}`);

  let { xmldata } = await xml2js.parseStringPromise(
    await response.text(),
    (err, res) => {
      if (err) return console.log(err);
      else return res;
    }
  );

  return xmldata.Orders;
}
