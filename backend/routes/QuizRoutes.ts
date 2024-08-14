import express from 'express';
import { CreateQuiz } from '../controllers/QuizController';

const QuizRoutes = express.Router();

QuizRoutes.post('/quiz', CreateQuiz);

export default QuizRoutes;
