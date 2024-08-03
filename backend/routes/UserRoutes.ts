import express from 'express';
import { CreateUser, GetUsers } from '../controllers/UserController';

const Userrouter = express.Router()

Userrouter.get('/users',GetUsers)
Userrouter.post('/users',CreateUser)



export default Userrouter