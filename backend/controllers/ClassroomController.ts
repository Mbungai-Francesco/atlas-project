import { db } from '../lib/db';
import { Request, Response } from 'express';

export const CreateClassroom = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res
        .status(400)
        .json({ message: 'missing clerkId in authorization header' });
    }

    const teacher = await db.teacher.findUnique({
      where: {
        clerkId: auth,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: 'unauthorized access' });
    }

    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: 'class name is required for class creation' });
    }

    // check if classRoom already exists
    const findclassroom = await db.classRoom.findUnique({
      where: {
        name: name.toLowerCase(),
      },
    });

    if (findclassroom) {
      return res.status(400).json({ message: 'class already exists' });
    }

    const createclassroom = await db.classRoom.create({
      data: {
        name: name.toLowerCase(),
      },
    });

    if (!createclassroom) {
      return res.status(400).json({ message: 'class not created' });
    }

    const existingClassroom = await db.classRoom.findUnique({
      where: { id: createclassroom.id },
      select: { teacherId: true },
    });

    const updatedClassroomIds = [
      ...(existingClassroom?.teacherId || []),
      teacher.id,
    ].filter(Boolean) as string[];

    const updatedClassroom = await db.classRoom.update({
      where: { id: createclassroom.id },
      data: {
        teacherId: updatedClassroomIds,
      },
    });

    return res.status(200).json(createclassroom);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};
