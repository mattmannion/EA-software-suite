import db from '../../util/db.js';
import logger from '../../util/logger.js';

export default async (req, res) => {
  logger(req);

  try {
    const data = await db
      .query(
        `
        select * from users u
        where u.username=$1 and u.password=$2;
      `,
        [req.body.username, req.body.password]
      )
      .then(res => res.rows)
      .catch(err => console.log(err.stack));

    if (data.length > 0) {
      res.status(200).json({
        status: 'logged in',
        data,
      });
    } else {
      res.status(204).json({
        status: 'login failed',
      });
    }
  } catch (error) {
    console.log(error);
  }
};
