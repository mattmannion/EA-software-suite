import db from '../../db/db.js';

export default async (req, res) => {
  try {
    const data = await db
      .query(
        `
        select * from users
      `
      )
      .then(res => res.rows)
      .catch(err => console.log(err.stack));

    res.status(200).send({
      data,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
