"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const QuizController_1 = require("../controllers/QuizController");
const QuizRoutes = express_1.default.Router();
QuizRoutes.get('/quizzes', QuizController_1.GetQuizzes);
QuizRoutes.get('/quizzes/:id', QuizController_1.GetQuiz);
QuizRoutes.post('/quizzes', QuizController_1.CreateQuiz);
QuizRoutes.put('/quizzes/:id', QuizController_1.UpdateQuiz);
QuizRoutes.delete('/quizzes/:id', QuizController_1.DeleteQuiz);
QuizRoutes.delete('/quizzes/:id/questions', QuizController_1.DeleteQuestions);
QuizRoutes.delete('/quizzes/:id/questions/:questionId', QuizController_1.DeleteQuestion);
exports.default = QuizRoutes;
