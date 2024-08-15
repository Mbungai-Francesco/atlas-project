import express from 'express';
import { CreateQuiz, GetQuizzes } from '../controllers/QuizController';

const QuizRoutes = express.Router();

QuizRoutes.get('/quiz', GetQuizzes);
QuizRoutes.post('/quiz', CreateQuiz);

export default QuizRoutes;
