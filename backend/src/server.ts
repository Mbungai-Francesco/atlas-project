import express, { Request, Response } from 'express';
require('dotenv').config();
require('../routes/UserRoutes');
import UserRoutes from '../routes/UserRoutes';
import TeacherRoutes from '../routes/TeacherRoutes';
import Classroomroutes from '../routes/ClassroomRoutes';
import LoginRoutes from '../routes/Login';
import QuizRoutes from '../routes/QuizRoutes';
import TopicRoutes from '../routes/TopicRoutes';
import Adminrouter from '../routes/AdminRoutes';
// import StudentInClassRoutes from '../routes/StudetnInClassRoutes';
import cors from 'cors';
import TopicContentRouter from '../routes/TopicContentRoutes';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to ATLAS API services...' });
});

app.use(
  '/api',
  UserRoutes,
  TeacherRoutes,
  Classroomroutes,
  LoginRoutes,
  QuizRoutes,
  TopicRoutes,
  Adminrouter,
  TopicContentRouter,
  // StudentInClassRoutes,
);

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'You are OUT OF BOUNDARIES!!!' });
});

app.listen(5000, () => {
  console.log(
    'server running on port 5000 : \nlocalhost: http://localhost:5000 \ndeployed: https://atlas-2jg5.onrender.com/',
  );
});
