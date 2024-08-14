import express, { Request, Response } from 'express';
require('dotenv').config();
require('../routes/UserRoutes');
import UserRoutes from '../routes/UserRoutes';
import TeacherRoutes from '../routes/TeacherRoutes';
import Classroomroutes from '../routes/ClassroomRoutes';
import LoginRoutes from '../routes/Login';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to ATLAS API services...' });
});

app.use('/api', UserRoutes, TeacherRoutes, Classroomroutes, LoginRoutes);

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'You are OUT OF BOUNDARIES!!!' });
});

app.listen(5000, () => {
  console.log('server running on port 5000 : http://localhost:5000');
});
