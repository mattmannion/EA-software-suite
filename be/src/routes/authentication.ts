import { Router } from 'express';
import check_login from '../controllers/authentication/check_login.js';
import login from '../controllers/authentication/login.js';

const authentication = Router();

authentication.route('/login').post(login).get(check_login);

export default authentication;
