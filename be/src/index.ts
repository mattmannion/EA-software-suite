require('dotenv').config();
import express, { json } from 'express';
import cors from 'cors';
import daily_task from './util/tasks/task_driver.js';
import daily_orders from './util/tasks/daily/daily_orders.js';
import router from './routes/router';
// import daily_update from './util/tasks/daily_update.js';

// init env
const port = process.env.PORT! || 7890;
const path = process.env.URL!;

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

app.use(...router);

// init async IIFE main
(async () =>
  app.listen(port, () => console.log(`server live at ${path + port}`)))();
