import fetch from 'node-fetch';
import logger from '../../logger/logger.js';
import xml2js from 'xml2js';

export default async (req, res) => {
  logger(req);

  const id = req.params.id;

  try {
    let response = await fetch(
      `${process.env.xml_server}${process.env.vol_prod_by_id}${id}`
    );

    let { xmldata } = await xml2js.parseStringPromise(
      await response.text(),
      { explicitArray: false },
      (err, res) => {
        if (err) return console.log(err);
        else return res;
      }
    );

    let { Orders: data } = xmldata;

    res.status(200).send({
      data,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
