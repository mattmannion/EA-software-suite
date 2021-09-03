import { Router } from 'express';
import login from '../controllers/authentication/login.js';
import login_info from '../controllers/authentication/login_info.js';
import logout from '../controllers/authentication/logout.js';

const authentication = Router();

authentication.route('/login').post(login).get(login_info);
authentication.route('/logout').delete(logout);

export default authentication;
