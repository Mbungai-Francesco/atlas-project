import express from 'express';
import { Login } from '../controllers/Login';

const LoginRoutes = express.Router();

LoginRoutes.post('/login', Login);

export default LoginRoutes;
