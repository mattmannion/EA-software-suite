import { Router } from 'express';
import kaffeine from '../controllers/kaffeine/kaffeine.js';

const router = new Router();

router.route('/').get(kaffeine);

export default router;
