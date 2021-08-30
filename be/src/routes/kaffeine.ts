import { Request, Response, Router } from 'express';
import logger from '../util/logging';

const kaffiene = Router();

kaffiene.route('/').get((req: Request, res: Response) => {
  logger(req);

  try {
    res.status(200).send({
      status: 'app woken up',
    });
  } catch (error) {
    console.log(error);
  }
});

export default kaffiene;
