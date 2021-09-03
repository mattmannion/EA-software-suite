import { Request, Response } from 'express';
import logger from '../../util/logging';

export default async function logout(req: Request, res: Response) {
  logger(req);

  try {
    let { session } = req;

    if (!session.username || !session.permissions)
      return res.status(202).json({
        status: 'No user to logout',
      });

    session.destroy(() => (session.cookie.expires = new Date()));

    return res.status(200).json({
      status: 'Logout Successful',
    });
  } catch (error) {
    return console.log(error);
  }
}
