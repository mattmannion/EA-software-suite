import { Router } from 'express';
import kaffeine from '../controllers/kaffeine/kaffeine.js';

const router = new Router();

router.route('/').post(kaffeine);

export default router;
