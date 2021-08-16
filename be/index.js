import { config } from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import users from './routes/users.js';
import login from './routes/login.js';
import orders from './routes/orders.js';

// init env
config();
const port = process.env.PORT || 7890;
const path = process.env.path;

// init app
const app = express();

// core middleware
app.use(cors());
app.use(json());

//////////////
/// Routes ///
//////////////

app.use(login);
app.use(users);
app.use(orders);

// init async IIFE main
(async () =>
  app.listen(port, () => console.log(`server live at ${path + port}`)))();
