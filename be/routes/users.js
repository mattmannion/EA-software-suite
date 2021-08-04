import { Router } from 'express';
import get_all from '../controllers/users/get_all.js';
import create_one from '../controllers/users/create_one.js';
import get_one from '../controllers/users/get_one.js';
import update_one from '../controllers/users/update_one.js';
import delete_one from '../controllers/users/delete_one.js';

const router = new Router();

router.route('/users').get(get_all).post(create_one);

router.route('/users/:id').get(get_one).put(update_one).delete(delete_one);

export default router;
