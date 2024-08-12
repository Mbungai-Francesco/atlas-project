import express from 'express';
import { CreateClassroom } from '../controllers/ClassroomController';

const Classroomroutes = express.Router();

Classroomroutes.post('/classrooms', CreateClassroom);

export default Classroomroutes;
