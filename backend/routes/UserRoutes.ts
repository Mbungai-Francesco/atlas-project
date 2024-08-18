import express from 'express';
import {
  CreateUser,
  GetUser,
  GetUsers,
  UpdateUser,
  DeleteUser,
} from '../controllers/UserController';

const Userrouter = express.Router();

Userrouter.get('/users', GetUsers);
Userrouter.post('/users', CreateUser);
Userrouter.put('/users/:id', UpdateUser);
Userrouter.get('/users/:id', GetUser);
Userrouter.delete('/users/:id', DeleteUser);

export default Userrouter;
