import db from '../../db/db.js';

export default async (req, res) => {
  try {
    const { first_name, last_name, email, password, confirmed } = req.body;

    const data = await db
      .query(
        `
      insert into users (first_name, last_name, email, password, confirmed)
      values ($1, $2, $3, $4, $5)
      returning *;
      `,
        [first_name, last_name, email, password, confirmed]
      )
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));
    if (data) {
      res.status(201).json({
        data,
        status: 'success',
      });
    } else {
      res.status(400).json({
        status: 'failure',
      });
    }
  } catch (error) {
    console.log(error);
  }
};
