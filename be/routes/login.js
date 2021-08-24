import { Router } from 'express';
import kaffeine from '../controllers/kaffeine/kaffeine.js';
import login from '../controllers/login/login.js';

const router = new Router();

router.route('/login').post(login);
router.route('/kaffeine').get(kaffeine);

export default router;
