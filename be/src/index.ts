require('dotenv').config();
import express, { json } from 'express';
import router from './routes/router';
import { path, port } from './env';
import cors_settings from './middleware/cors_settings';
import session from './middleware/redis-session';
// import daily_task from './util/tasks/task_driver.js';
// import daily_orders from './util/tasks/daily/daily_orders.js';
// import daily_update from './util/tasks/daily_update.js';

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
// daily_task(daily_update, { second: 0, minute: 0, hour: 17 });
// daily_task(daily_orders, { second: 0, minute: 0, hour: 18 });
//starts at 5pm est everyday

//////////////
/// Routes ///
//////////////

app.use(...router);

// init async IIFE main
(async () => app.listen(port, () => console.log(`live @ ${path + port}`)))();
