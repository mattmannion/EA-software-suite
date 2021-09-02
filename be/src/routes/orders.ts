import { Router } from 'express';
import get_orders from '../controllers/orders/get/get_orders.js';
import get_orders_production from '../controllers/orders/get/get_orders_production.js';
import get_orders_completed from '../controllers/orders/get/get_orders_completed.js';
import get_orders_shipped from '../controllers/orders/get/get_orders_shipped.js';
import insert_orders from '../controllers/orders/insert/insert_orders.js';
import update_item from '../controllers/orders/update/update_item.js';
import daily_update from '../controllers/orders/update/daily_update_ep.js';
import notes from '../controllers/orders/update/notes.js';
import pallet from '../controllers/orders/update/process/pallet.js';
import tack from '../controllers/orders/update/process/tack.js';
import assembled from '../controllers/orders/update/process/assembled.js';
import completed from '../controllers/orders/update/process/completed.js';
import insert_new_db from '../controllers/orders/insert/insert_new_db.js';

const orders = Router();

orders.route('/orders/production').get(get_orders_production);
orders.route('/orders/production/completed').get(get_orders_completed);
orders.route('/orders/production/shipped').get(get_orders_shipped);

orders.route('/orders/new_db').get(insert_new_db);

orders.route('/orders/insert_orders').get(insert_orders);
orders.route('/orders/insert_orders/:id').get(insert_orders);

orders.route('/orders/update').put(daily_update);
orders.route('/orders/update/:id&:o_id&:od_id').put(update_item);
orders.route('/orders/update/notes/:id&:o_id&:od_id').put(notes);

orders.route('/orders/update/process/pallet/:id&:o_id&:od_id').put(pallet);
orders.route('/orders/update/process/tack/:id&:o_id&:od_id').put(tack);
orders
  .route('/orders/update/process/assembled/:id&:o_id&:od_id')
  .put(assembled);
orders
  .route('/orders/update/process/completed/:id&:o_id&:od_id')
  .put(completed);

orders.route('/orders').get(get_orders);

export default orders;
