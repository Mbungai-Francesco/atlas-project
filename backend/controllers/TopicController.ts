import { db } from '../lib/db';
import { Request, Response } from 'express';

export const CreateTopic = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res
        .status(400)
        .json({ message: 'Teacher ClerkId as Authorization is required' });
    }

    if (!(await db.teacher.findUnique({ where: { clerkId: auth } }))) {
      return res.status(400).json({ message: 'Teacher not found' });
    }

    const { name, classRoomId } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Topic name is required' });
    }

    if (await db.topic.findUnique({ where: { name } })) {
      return res
        .status(400)
        .json({ message: 'A topic with this name already exists' });
    }

    if (!classRoomId) {
      return res.status(400).json({ message: 'ClassRoom ID is required' });
    }

    if (!(await db.classRoom.findUnique({ where: { id: classRoomId } }))) {
      return res.status(400).json({ message: 'ClassRoom does not exist' });
    }

    const topic = await db.topic.create({
      data: {
        name,
        classRoomId,
      },
    });

    if (!topic) {
      return res.status(400).json({ message: 'Topic not created' });
    }

    return res
      .status(201)
      .json({ message: 'Topic created successfully', data: topic });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const GetTopics = async (req: Request, res: Response) => {
  try {
    const gettopics = await db.topic.findMany({
      include: {
        classRoom: true,
        topicContent: true,
        quizzes: true,
      },
    });

    if (!gettopics) {
      return res.status(400).json({ message: 'Topics not found' });
    }

    return res.status(200).json(gettopics);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

export const UpdateTopic = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res
        .status(400)
        .json({ message: 'Teacher ClerkId as Authorization is required' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    const { name, classRoomId } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Topic name is required' });
    }

    if (!classRoomId) {
      return res.status(400).json({ message: 'ClassRoom ID is required' });
    }

    if (!(await db.classRoom.findUnique({ where: { id: classRoomId } }))) {
      return res.status(400).json({ message: 'ClassRoom does not exist' });
    }

    const topic = await db.topic.update({
      where: {
        id,
      },
      data: {
        name,
        classRoomId,
      },
    });

    if (!topic) {
      return res.status(400).json({ message: 'Topic not updated' });
    }

    return res
      .status(200)
      .json({ message: 'Topic updated successfully', data: topic });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const DeleteTopic = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res
        .status(400)
        .json({ message: 'Teacher ClerkId as Authorization is required' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Topic ID is required' });
    }

    const topic = await db.topic.findUnique({
      where: { id },
    });

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    await db.topic.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Topic deleted successfully' });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const GetTopic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Topic ID is required' });
    }

    const topic = await db.topic.findUnique({
      where: { id },
      include: {
        classRoom: true,
        topicContent: true,
        quizzes: true,
      },
    });

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    return res.status(200).json(topic);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
