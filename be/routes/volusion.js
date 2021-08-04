import { Router } from 'express';
import get_prod_by_id from '../controllers/volusion/get_prod_by_id.js';
import get_prods from '../controllers/volusion/get_prods.js';

const router = new Router();

router.route('/volusion/:id').get(get_prod_by_id);
router.route('/volusion/').get(get_prods);

export default router;
