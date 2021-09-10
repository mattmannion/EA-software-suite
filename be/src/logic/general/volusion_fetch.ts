import fetch from 'node-fetch';
import xml2js from 'xml2js';
import { vol_url } from '../../env';

export default async function volusion_fetch(id: number | string) {
  let response = await fetch(`${vol_url}${id}`);
  // let { xmldata } =
  await xml2js
    .parseStringPromise(await response.text())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  // console.log(xmldata);

  // return xmldata.Orders;
}
