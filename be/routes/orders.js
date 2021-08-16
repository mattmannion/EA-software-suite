import { Router } from 'express';
import get_orders from '../controllers/orders/get_orders.js';
import get_orders_production from '../controllers/orders/get_orders_production.js';
import get_orders_completed from '../controllers/orders/get_orders_completed.js';
import get_orders_shipped from '../controllers/orders/get_orders_shipped.js';
import insert_orders from '../controllers/orders/insert_orders.js';
import daily_orders from '../controllers/orders/daily_orders.js';

const router = new Router();

// router.route('/orders/:id').get(get_prod_by_id);
router.route('/orders/production').get(get_orders_production);
router.route('/orders/production/completed').get(get_orders_completed);
router.route('/orders/production/shipped').get(get_orders_shipped);
router.route('/orders').get(get_orders);
router.route('/orders/insert_orders').get(insert_orders);
router.route('/orders/insert_orders/:id').get(insert_orders);

router.route('/orders/daily').get(daily_orders);

export default router;
