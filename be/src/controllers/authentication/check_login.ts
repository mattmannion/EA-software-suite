import { Request, Response } from 'express';
import logger from '../../util/logging';

export default async function check_login(req: Request, res: Response) {
  logger(req);

  try {
    let { session } = req;

    const logged_in =
      session.username && session
        ? 'you are logged in'
        : 'you are not logged in';

    const { username, permissions } = session;

    if (!session.username || !session.permissions) {
      session.destroy(() => {
        session.cookie.expires = new Date();
      });
    }

    return res.status(200).json({
      username,
      permissions,
      status: logged_in,
    });
  } catch (error) {
    return console.log(error);
  }
}
