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

export const UpdateQuiz = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res.status(400).json({ message: 'Authorization is required' });
    }

    const { id } = req.params;
    const { questions, ...others } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Quiz ID is required' });
    }

    const quiz = await db.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Start a transaction to ensure atomicity
    await db.$transaction(async (prisma) => {
      // Update questions if provided
      if (questions && Array.isArray(questions) && questions.length > 0) {
        for (const question of questions) {
          if (
            !question.question ||
            !question.options ||
            question.options.length < 4 ||
            !question.answer
          ) {
            return res.status(400).json({
              message:
                'Each question must have a question text, at least 4 options, and an answer',
            });
          }

          if (!question.options.includes(question.answer)) {
            return res
              .status(400)
              .json({ message: 'The answer must be one of the options' });
          }

          // Check if it's an existing question (update) or a new one (create)
          if (question.id) {
            await prisma.question.update({
              where: { id: question.id },
              data: {
                question: question.question,
                options: question.options,
                answer: question.answer,
              },
            });
          } else {
            await prisma.question.create({
              data: {
                quizId: id,
                question: question.question,
                options: question.options,
                answer: question.answer,
              },
            });
          }
        }
      }

      // Update the quiz properties if `others` contains any fields
      if (Object.keys(others).length > 0) {
        const { topicId, title } = others;

        const updateData: any = {};

        if (
          title &&
          title !== quiz.title &&
          !(await db.quiz.findUnique({ where: { title } }))
        ) {
          updateData.title = title;
        }

        if (topicId && topicId !== quiz.topicId) {
          updateData.topicId = topicId;
        }

        await prisma.quiz.update({
          where: { id },
          data: updateData,
        });
      }
    });

    // Fetch the updated quiz with its associated questions
    const updatedQuiz = await db.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });

    return res
      .status(200)
      .json({ message: 'Quiz updated successfully', data: updatedQuiz });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const DeleteQuiz = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res.status(400).json({ message: 'Authorization is required' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Quiz ID is required' });
    }

    const quiz = await db.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    await db.quiz.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const GetQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Quiz ID is required' });
    }

    const quiz = await db.quiz.findUnique({
      where: { id },
      include: {
        questions: true,
        attempts: true,
      },
    });

    // checking quiz
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    return res.status(200).json(quiz);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// delete one or many questions from a quiz
export const DeleteQuestions = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res.status(400).json({ message: 'Authorization is required' });
    }

    const { id } = req.params;
    const { questionIds } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Quiz ID is required' });
    }

    if (
      !questionIds ||
      !Array.isArray(questionIds) ||
      questionIds.length === 0
    ) {
      return res.status(400).json({ message: 'Question IDs are required' });
    }

    const quiz = await db.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    for (const questionId of questionIds) {
      await db.question.delete({
        where: { id: questionId },
      });
    }

    return res.status(200).json({ message: 'Questions deleted successfully' });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const DeleteQuestion = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res.status(400).json({ message: 'Authorization is required' });
    }

    const { id, questionId } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Quiz ID is required' });
    }

    if (!questionId) {
      return res.status(400).json({ message: 'Question ID is required' });
    }

    const quiz = await db.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const question = await db.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await db.question.delete({
      where: { id: questionId },
    });

    return res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
