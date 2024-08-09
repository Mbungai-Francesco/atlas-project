import express, { Request, Response } from 'express';
require('dotenv').config();
require('../routes/UserRoutes');
import UserRoutes from '../routes/UserRoutes';
import TeacherRoutes from '../routes/TeacherRoutes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json('hello coming from the atlas landing page');
});

app.use('/api', UserRoutes, TeacherRoutes);
// app.use(UserRoutes,TeacherRoutes, /**.Routes */)

app.listen(3000, () => {
  console.log('server running on port 5000 : http://localhost:5000');
});
