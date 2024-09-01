import express from 'express';
import { DeleteUser } from '../controllers/AdminController';

const Adminrouter = express.Router();

Adminrouter.delete('/users/:id', DeleteUser);

export default Adminrouter;
