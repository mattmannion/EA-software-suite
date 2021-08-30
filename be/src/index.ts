require('dotenv').config();
import express, { json } from 'express';
import cors from 'cors';
import kaffeine from './routes/kaffeine.js';
import users from './routes/users.js';
import login from './routes/login.js';
import orders from './routes/orders.js';
import daily_task from './util/tasks/task_driver.js';
import daily_orders from './util/tasks/daily/daily_orders.js';
// import daily_update from './util/tasks/daily_update.js';

// init env
const port = process.env.PORT! || 7890;
const path = process.env.path!;

// init app
const app = express();

// core middleware
app.use(cors());
app.use(json());

//////////////////
/// Daily Task ///
//////////////////
// daily_task(daily_update, { second: 0, minute: 0, hour: 17 });
daily_task(daily_orders, { second: 0, minute: 0, hour: 18 });
//starts at 5pm est everyday

//////////////
/// Routes ///
//////////////

app.use(kaffeine);
app.use(login);
app.use(users);
app.use(orders);

// init async IIFE main
(async () =>
  app.listen(port, () => console.log(`server live at ${path + port}`)))();
