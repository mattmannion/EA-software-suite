import { config } from 'dotenv';
config();

import pg from 'pg';

export const pool = new pg.Pool();

export default {
  query: (text, params) => pool.query(text, params),
};
