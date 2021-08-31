import { Request, Response } from 'express';
import create_order from '../../../logic/orders/insert/create_order';
import logger from '../../../util/logging';

export default async (req: Request, res: Response) => {
  logger(req);

  const { id } = req.params;

  try {
    await create_order(id);

    res.status(201).json({
      status: 'order created',
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'failure',
    });
  }
};
