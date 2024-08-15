import { db } from '../lib/db';
import { Request, Response } from 'express';

export const CreateQuiz = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res.status(400).json({ message: 'Authorization is required' });
    }

    const { title, questions, topicId } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Quiz title is required' });
    }

    if (await db.quiz.findUnique({ where: { title } })) {
      return res
        .status(400)
        .json({ message: 'A quiz with this title already exists' });
    }

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Quiz questions are required' });
    }

    if (!topicId) {
      return res.status(400).json({ message: 'Topic ID is required' });
    }

    for (const question of questions) {
      if (!question.question) {
        return res
          .status(400)
          .json({ message: 'Each question must have a question text' });
      }

      if (!question.options || question.options.length < 4) {
        return res
          .status(400)
          .json({ message: 'Each question must have at least 4 options' });
      }

      if (!question.answer) {
        return res
          .status(400)
          .json({ message: 'Each question must have an answer' });
      }

      if (!question.options.includes(question.answer)) {
        return res
          .status(400)
          .json({ message: 'The answer must be one of the options' });
      }
    }

    const quiz = await db.quiz.create({
      data: {
        title,
        topicId,
      },
    });

    if (!quiz) {
      return res.status(500).json({ message: 'Quiz not created' });
    }

    const quizId = quiz.id;

    for (const question of questions) {
      await db.question.create({
        data: {
          quizId,
          question: question.question,
          options: question.options,
          answer: question.answer,
        },
      });
    }

    const createdQuiz = await db.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        questions: true,
      },
    });

    return res
      .status(201)
      .json({ message: 'Quiz created successfully', data: createdQuiz });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const GetQuizzes = async (req: Request, res: Response) => {
  try {
    const getquizzes = await db.quiz.findMany({
      include: {
        questions: true,
        attempts: true,
      },
    });

    if (!getquizzes) {
      return res.status(400).json({ message: 'Quizzes not found' });
    }

    return res.status(200).json(getquizzes);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
