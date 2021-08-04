import { Router } from 'express';
import login from '../controllers/login/login.js';

const router = new Router();

router.route('/login').post(login);

export default router;
