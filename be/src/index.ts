require('dotenv').config();
import express, { json } from 'express';
import router from './routes/router';
import { path, port, prod } from './env';
import cors_settings from './middleware/cors_settings';
import session from './middleware/redis-session';
import task_driver from './util/tasks/task_driver';
import daily_update from './util/tasks/daily/daily_update';
import daily_orders from './util/tasks/daily/daily_orders';

// init app
const app = express();

// redis session
app.use(session);

// core middleware
app.options('*', cors_settings);
app.use(cors_settings);

app.use(json());

//////////////////
/// Daily Task ///
//////////////////
if (prod) {
  task_driver(daily_update, { second: 0, minute: 0, hour: 17 });
  task_driver(daily_orders, { second: 0, minute: 0, hour: 18 });
}
//starts at 5pm est everyday

//////////////
/// Routes ///
//////////////

app.use(...router);

// init async IIFE main
app.listen(port, () => console.log(`live @ ${path + port}`));
