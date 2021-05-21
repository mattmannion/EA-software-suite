import db from '../../db/db.js';

export default async (req, res) => {
  try {
    const { id } = req.params;

    const query = await db
      .query('select * from users where id = $1', [id])
      .then(res => res.rows[0])
      .catch(err => console.log(err.stack));

    let { first_name, last_name, email, password, confirmed } = req.body;

    if (!first_name) first_name = query.first_name;
    if (!last_name) last_name = query.last_name;
    if (!email) email = query.email;
    if (!password) password = query.password;
    if (!confirmed) confirmed = query.confirmed;

    const data = await db
      .query(
        `
        update users set first_name = $2, last_name = $3, email = $4, password = $5, confirmed = $6
        where id = $1
        returning *;
      `,
        [id, first_name, last_name, email, password, confirmed]
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
