import { Request, Response } from 'express';
import { db } from '../lib/db';

function extractPublicId(url: string): string | null {
  const regex = /\/([^\/]+)\.[a-zA-Z]+$/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const CreateContent = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res
        .status(400)
        .json({ message: 'missing teacher authorization header' });
    }

    const findTeacher = await db.teacher.findUnique({
      where: {
        clerkId: auth,
      },
    });

    if (!findTeacher) {
      return res.status(400).json({ message: 'teacehr not found' });
    }

    const { topicId, content, contenttpye } = req.body;
    const contentToCreate: any = {};

    if (!topicId) {
      return res.status(400).json({ message: 'missing topic Id' });
    }

    if (
      !(await db.topic.findUnique({
        where: {
          id: topicId,
        },
      }))
    ) {
      return res
        .status(404)
        .json({ message: 'topic not found, provide a correct topic ID' });
    }

    contentToCreate['topicId'] = topicId;

    if (contenttpye && contenttpye !== 'PDF') {
      contentToCreate['contenttpye'] = contenttpye;
    }

    if (!content) {
      return res
        .status(400)
        .json({ message: 'file url missing, provide a url' });
    }

    if (!extractPublicId(content)) {
      return res.status(400).json({ message: 'invalid cloudinary url' });
    }

    contentToCreate['content'] = content;

    const CreateContent = await db.topicContent.create({
      data: {
        ...contentToCreate,
      },
    });

    if (!CreateContent) {
      return res.status(500).json({ message: 'topic content not created' });
    }

    return res.status(200).json({
      message: 'topic content created successfully',
      data: CreateContent,
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const UpdateContent = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res
        .status(400)
        .json({ message: 'missing teacher authorization header' });
    }

    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: 'missing topic content id as parameters' });
    }

    const topicContent = await db.topicContent.findUnique({ where: { id } });

    if (!topicContent) {
      return res.status(400).json({ message: 'Topic content not found' });
    }

    const findTeacher = await db.teacher.findUnique({
      where: {
        clerkId: auth,
      },
    });

    if (!findTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const { topicId, contenttype, content } = req.body;
    const toUpdate: any = {};

    if (topicId) {
      if (!(await db.topic.findUnique({ where: { id: topicId } }))) {
        return res.status(404).json({ message: 'Topic not found' });
      }

      if (topicId !== topicContent.topicId) {
        toUpdate['topicId'] = topicId;
      }
    }

    if (contenttype && contenttype !== topicContent.contenttpye) {
      toUpdate['contenttype'] = contenttype;
    }

    if (content && content !== topicContent.content) {
      if (!extractPublicId(content)) {
        return res.status(400).json({ message: 'invalid url for content' });
      }

      toUpdate['content'] = content;
    }

    const update = db.topicContent.update({
      where: {
        id,
      },
      data: {
        ...toUpdate,
      },
    });

    if (!update) {
      return res.status(500).json({ message: 'topic content not updated' });
    }

    return res
      .status(200)
      .json({ message: 'topic content updated successfully', data: update });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const GetTopicContents = async (req: Request, res: Response) => {
  try {
    const topicContents = await db.topicContent.findMany();

    if (!topicContents) {
      return res.status(404).json({ message: 'no topic content found' });
    }

    return res.status(200).json(topicContents);
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const GetTopicContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'missing topic content id' });
    }

    const topicContent = await db.topicContent.findUnique({
      where: { id },
    });

    if (!topicContent) {
      return res.status(404).json({ message: 'topic content not found' });
    }

    return res.status(200).json(topicContent);
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const DeleteTopicContent = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res
        .status(400)
        .json({ message: 'missing authorization header for teacher' });
    }

    if (!(await db.teacher.findUnique({ where: { clerkId: auth } }))) {
      return res.status(401).json({ message: 'unauthorized user' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'missing topic content id' });
    }

    const deletedTopicContent = await db.topicContent.delete({
      where: { id },
    });

    if (!deletedTopicContent) {
      return res.status(404).json({ message: 'topic content not found' });
    }

    return res
      .status(200)
      .json({ message: 'topic content deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
