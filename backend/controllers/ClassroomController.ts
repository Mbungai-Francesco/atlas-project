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
        teacherId: [teacher.id],
      },
    });

    if (!createclassroom) {
      return res.status(400).json({ message: 'class not created' });
    }

    // const existingTeachers = await db.classRoom.findUnique({
    //   where: { id: createclassroom.id },
    //   select: { teacherId: true },
    // });

    // const updatedClassroomIds = [
    //   ...(existingTeachers?.teacherId || []),
    //   teacher.id,
    // ].filter(Boolean) as string[];

    // const updatedClassroom = await db.classRoom.update({
    //   where: { id: createclassroom.id },
    //   data: {
    //     teacherId: updatedClassroomIds,
    //   },
    // });

    return res
      .status(200)
      .json({ message: 'class created successfully', data: createclassroom });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

export const GetMyClassrooms = async (req: Request, res: Response) => {
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

    const classrooms = await db.classRoom.findMany({
      where: {
        teacherId: {
          hasSome: [teacher.id],
        },
      },
    });

    return res.status(200).json(classrooms);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

export const GetClassrooms = async (req: Request, res: Response) => {
  try {
    const classrooms = await db.classRoom.findMany();

    return res.status(200).json(classrooms);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

export const GetClassroom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'classroom id is required' });
    }

    const classroom = await db.classRoom.findUnique({
      where: {
        id: id,
      },
    });

    if (!classroom) {
      return res.status(400).json({ message: 'classroom not found' });
    }

    return res.status(200).json(classroom);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

export const UpdateClassroom = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res
        .status(400)
        .json({ message: 'missing teacher clerkId in authorization header' });
    }

    const teacher = await db.teacher.findUnique({
      where: {
        clerkId: auth,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: 'unauthorized access' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'classroom id is required' });
    }

    const findclassroom = await db.classRoom.findUnique({
      where: {
        id: id,
      },
    });

    if (!findclassroom) {
      return res.status(400).json({ message: 'classroom not found' });
    }

    if (!findclassroom.teacherId.includes(teacher.id)) {
      return res.status(401).json({ message: 'unauthorized access' });
    }

    const { teacherId, ...values } = req.body;
    let updatedTeacherIds: string[] = [];

    if (!values && !teacherId) {
      return res.status(400).json({ message: 'new values are required' });
    }

    if (teacherId) {
      teacherId.forEach(async (id: string) => {
        const teacher = await db.teacher.findUnique({
          where: {
            id: id,
          },
        });

        if (!teacher) {
          return res
            .status(400)
            .json({ message: 'one or many teachers not found' });
        }
      });

      const existingTeachers = findclassroom.teacherId;

      // verify if teacherId already exists in the classroom
      for (let i = 0; i < teacherId.length; i++) {
        if (existingTeachers.includes(teacherId[i])) {
          return res.status(400).json({
            message: 'one or many teachers already in the classroom',
          });
        }
      }

      updatedTeacherIds = [...(existingTeachers || []), ...teacherId].filter(
        Boolean,
      ) as string[];
    }

    const updateclassroom = await db.classRoom.update({
      where: {
        id: id,
      },
      data: {
        ...values,
        teacherId: updatedTeacherIds
          ? updatedTeacherIds
          : findclassroom.teacherId,
      },
    });

    return res.status(200).json({
      message: 'classroom updated successfully',
      data: updateclassroom,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

export const DeleteClassroom = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];

    if (!auth) {
      return res
        .status(400)
        .json({ message: 'missing teacher clerkId in authorization header' });
    }

    const teacher = await db.teacher.findUnique({
      where: {
        clerkId: auth,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: 'unauthorized access' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'classroom id is required' });
    }

    const findclassroom = await db.classRoom.findUnique({
      where: {
        id: id,
      },
    });

    if (!findclassroom) {
      return res.status(400).json({ message: 'classroom not found' });
    }

    const deleteclassroom = await db.classRoom.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      message: 'classroom deleted successfully',
      data: deleteclassroom,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};
