import { Router } from 'express';
import login from '../controllers/authentication/login.js';

const authentication = Router();

authentication.route('/login').post(login);

export default authentication;
