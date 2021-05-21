import { config } from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import root from './routes/root.js';

// init env
config();
const port = process.env.port || 7890;
const path = process.env.path;

// init app
const app = express();

// middleware
app.use(cors());
app.use(json());

// is '/' or the root dir of the doma
app.use(root);

// init async IIFE main
(async () =>
  app.listen(port, () => console.log(`server live at ${path + port}`)))();
