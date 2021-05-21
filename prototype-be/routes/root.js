import { Router } from 'express';
import get_all from '../controllers/root/get_all.js';
import create_one from '../controllers/root/create_one.js';
import get_one from '../controllers/root/get_one.js';
import update_one from '../controllers/root/update_one.js';
import delete_one from '../controllers/root/delete_one.js';

const router = new Router();

router.route('/').get(get_all).post(create_one);

router.route('/:id').get(get_one).put(update_one).delete(delete_one);

export default router;
