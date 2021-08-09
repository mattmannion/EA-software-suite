import { Router } from 'express';
import get_orders from '../controllers/orders/get_orders.js';
import get_orders_filtered from '../controllers/orders/get_orders_filtered.js';
import insert_orders from '../controllers/orders/insert_orders.js';

const router = new Router();

// router.route('/orders/:id').get(get_prod_by_id);
router.route('/orders/insert_orders').get(insert_orders);
router.route('/orders').get(get_orders);
router.route('/orders/filtered').get(get_orders_filtered);

export default router;
