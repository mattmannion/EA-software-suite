import { Router } from 'express';
import get_orders from '../controllers/orders/get/get_orders.js';
import get_orders_production from '../controllers/orders/get/get_orders_production.js';
import get_orders_completed from '../controllers/orders/get/get_orders_completed.js';
import get_orders_shipped from '../controllers/orders/get/get_orders_shipped.js';
import insert_orders from '../controllers/orders/insert/insert_orders.js';
import update_order from '../controllers/orders/update/update_item.js';
import daily_update from '../controllers/orders/update/daily_update.js';
import notes from '../controllers/orders/update/notes.js';

const router = new Router();

// router.route('/orders/:id').get(get_prod_by_id);
router.route('/orders/production').get(get_orders_production);
router.route('/orders/production/completed').get(get_orders_completed);
router.route('/orders/production/shipped').get(get_orders_shipped);

router.route('/orders/insert_orders').get(insert_orders);
router.route('/orders/insert_orders/:id').get(insert_orders);
router.route('/orders/update').put(daily_update);
router.route('/orders/update/:o_id&:od_id').put(update_order);
router.route('/orders/update/notes/:o_id&:od_id').put(notes);

router.route('/orders').get(get_orders);

export default router;
