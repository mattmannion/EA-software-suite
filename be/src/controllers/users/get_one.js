import db from '../../util/db.js';
import logger from '../../util/logging.js';

export default async (req, res) => {
  logger(req);

  try {
    const data = await db
      .query(
        `
        select * from users where id = $1
      `,
        [req.params.id]
      )
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));

    res.status(200).json({
      data,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
