import fetch from 'node-fetch';
import xml2js from 'xml2js';

export default async function volusion_fetch(id: number) {
  let response = await fetch(`${process.env.insert_order_v3}${id}`);

  let { xmldata } = await xml2js
    .parseStringPromise(await response.text())
    .then(res => res)
    .catch(err => console.log(err));

  return xmldata.Orders;
}
