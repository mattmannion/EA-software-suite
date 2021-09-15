import { Request, Response } from 'express';
import create_order from '../../../logic/orders/insert/create_order';
import logger from '../../../util/logging';

export default async (req: Request, res: Response) => {
  logger(req);

  const { id } = req.params;

  try {
    console.log(id);
    // id === order_id for volusion
    await create_order(id);

    res.status(201).json({
      status: `order ${id} fetched and created`,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'db failure',
    });
  }
};
