import express from 'express';
import {
  CreateClassroom,
  GetClassrooms,
  GetMyClassrooms,
  GetClassroom,
  UpdateClassroom,
  DeleteClassroom,
} from '../controllers/ClassroomController';

const Classroomroutes = express.Router();

Classroomroutes.post('/classrooms', CreateClassroom);
Classroomroutes.get('/classrooms', GetClassrooms);
Classroomroutes.get('/myclassrooms', GetMyClassrooms);
Classroomroutes.get('/classrooms/:id', GetClassroom);
Classroomroutes.put('/classrooms/:id', UpdateClassroom);
Classroomroutes.delete('/classrooms/:id', DeleteClassroom);

export default Classroomroutes;
