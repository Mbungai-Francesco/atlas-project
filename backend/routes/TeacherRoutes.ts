import express from 'express';
import { CreateUser, GetUsers } from '../controllers/UserController';

const Userrouter = express.Router()

Userrouter.get('/teachers',GetUsers)
Userrouter.post('/teachers',CreateUser)



export default Userrouter