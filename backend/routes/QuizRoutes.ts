import express from 'express';
import {
  CreateQuiz,
  GetQuizzes,
  GetQuiz,
  DeleteQuiz,
  DeleteQuestions,
  UpdateQuiz,
  DeleteQuestion,
} from '../controllers/QuizController';

const QuizRoutes = express.Router();

QuizRoutes.get('/quizzes', GetQuizzes);
QuizRoutes.get('/quizzes/:id', GetQuiz);
QuizRoutes.post('/quizzes', CreateQuiz);
QuizRoutes.put('/quizzes/:id', UpdateQuiz);
QuizRoutes.delete('/quizzes/:id', DeleteQuiz);
QuizRoutes.delete('/quizzes/:id/questions', DeleteQuestions);
QuizRoutes.delete('/quizzes/:id/questions/:questionId', DeleteQuestion);

export default QuizRoutes;
