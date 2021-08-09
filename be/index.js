import { config } from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import users from './routes/users.js';
import login from './routes/login.js';
import volusion from './routes/volusion.js';
import orders from './routes/orders.js';

// init env
config();
const port = process.env.port || 7890;
const path = process.env.path;

// init app
const app = express();

// core middleware
app.use(
  cors({
    origin: process.env.front_end,
    credentials: true,
  })
);
app.use(json());

//////////////
/// Routes ///
//////////////

app.use(login);
app.use(users);
app.use(volusion);
app.use(orders);

// init async IIFE main
(async () =>
  app.listen(port, () => console.log(`server live at ${path + port}`)))();
