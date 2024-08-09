import express from 'express';
import {
  CreateTeacher,
  GetTeachers,
  GetTeacher,
  UpdateTeacher,
} from '../controllers/TeacherController';

const Userrouter = express.Router();

Userrouter.get('/teachers', GetTeachers);
Userrouter.post('/teachers', CreateTeacher);
Userrouter.put('/teachers/:id', UpdateTeacher);
Userrouter.get('/teachers/:id', GetTeacher);

export default Userrouter;
