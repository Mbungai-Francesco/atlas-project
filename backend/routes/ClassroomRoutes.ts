import express from 'express';
import {
  CreateClassroom,
  GetClassrooms,
  GetMyClassrooms,
  GetClassroom,
} from '../controllers/ClassroomController';

const Classroomroutes = express.Router();

Classroomroutes.post('/classrooms', CreateClassroom);
Classroomroutes.get('/classrooms', GetClassrooms);
Classroomroutes.get('/myclassrooms', GetMyClassrooms);
Classroomroutes.get('/classrooms/:id', GetClassroom);

export default Classroomroutes;
