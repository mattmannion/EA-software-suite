import pg from 'pg';

export const db = new pg.Pool({ idleTimeoutMillis: 100 });

export const dbq = async (
  query: string,
  array: [],
  rows: null | boolean | number = null
) => {
  if (!Array.isArray(array)) array = [];
  if (rows === null)
    return await db.query(query, array).catch(err => console.log(err));
  if (rows === false || rows === 0)
    return await db
      .query(query, array)
      .then(res => res.rows[0])
      .catch(err => console.log(err));
  if (rows === true || rows === 1)
    return await db
      .query(query, array)
      .then(res => res.rows)
      .catch(err => console.log(err));
};

export default db;
