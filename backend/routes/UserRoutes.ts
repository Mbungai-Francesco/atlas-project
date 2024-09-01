import express from 'express';
import {
  CreateUser,
  GetUser,
  GetUsers,
  UpdateUser,
} from '../controllers/UserController';

const Userrouter = express.Router();

Userrouter.get('/users', GetUsers);
Userrouter.post('/users', CreateUser);
Userrouter.put('/users/:id', UpdateUser);
Userrouter.get('/users/:id', GetUser);

export default Userrouter;
