import { Router } from 'express';
import get_orders from '../controllers/orders/get/get_orders.js';
import get_orders_production from '../controllers/orders/get/get_orders_production.js';
import get_orders_completed from '../controllers/orders/get/get_orders_completed.js';
import get_orders_shipped from '../controllers/orders/get/get_orders_shipped.js';
import insert_orders from '../controllers/orders/insert/insert_orders.js';
import update_order from '../controllers/orders/update/update_item.js';
import daily_update from '../controllers/orders/update/daily_update.js';
import notes from '../controllers/orders/update/notes.js';
import pallet from '../controllers/orders/update/process/pallet.js';
import tack from '../controllers/orders/update/process/tack.js';
import assembled from '../controllers/orders/update/process/assembled.js';
import completed from '../controllers/orders/update/process/completed.js';

const router = new Router();

router.route('/orders/production').get(get_orders_production);
router.route('/orders/production/completed').get(get_orders_completed);
router.route('/orders/production/shipped').get(get_orders_shipped);

router.route('/orders/insert_orders').get(insert_orders);
router.route('/orders/insert_orders/:id').get(insert_orders);

router.route('/orders/update').put(daily_update);
router.route('/orders/update/:o_id&:od_id').put(update_order);
router.route('/orders/update/notes/:id&:o_id&:od_id').put(notes);

router.route('/orders/update/process/pallet/:id&:o_id&:od_id').put(pallet);
router.route('/orders/update/process/tack/:id&:o_id&:od_id').put(tack);
router
  .route('/orders/update/process/assembled/:id&:o_id&:od_id')
  .put(assembled);
router
  .route('/orders/update/process/completed/:id&:o_id&:od_id')
  .put(completed);

router.route('/orders').get(get_orders);

export default router;
