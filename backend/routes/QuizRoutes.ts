import express from 'express';
import {
  CreateQuiz,
  GetQuizzes,
  GetQuiz,
  DeleteQuiz,
  DeleteQuestions,
  UpdateQuiz,
} from '../controllers/QuizController';

const QuizRoutes = express.Router();

QuizRoutes.get('/quiz', GetQuizzes);
QuizRoutes.post('/quiz', CreateQuiz);
QuizRoutes.get('/quiz/:id', GetQuiz);
QuizRoutes.put('/quiz/:id', UpdateQuiz);
QuizRoutes.delete('/quiz/:id', DeleteQuiz);
QuizRoutes.delete('/quiz/:id/questions', DeleteQuestions);

export default QuizRoutes;
