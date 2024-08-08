import { db } from '../lib/db.js';
import { Request, Response } from 'express';

export const CreateTeacher = async (req: Request, res: Response) => {
  try {
    const { username, email, clerkId, teachingsubject } = await req.body;

    if (!clerkId) {
      return res.status(400).json({
        message: 'clerkId is required. please try again with this value added',
      });
    }

    if (!username || !email || !teachingsubject) {
      return res.status(400).json({
        message:
          'username, email and subject teaching are required. please try again with these values added',
      });
    }

    // find user in db
    const finduser = await db.teacher.findUnique({
      where: {
        email,
      },
    });

    if (finduser) {
      return res
        .status(400)
        .json({ message: 'user already exists', data: finduser });
    }

    const createuser = await db.teacher.create({
      data: {
        username,
        email,
        teachingsubject,
        clerkId,
      },
    });

    if (!createuser) {
      return res.status(400).json({ message: 'user not created' });
    }

    return res
      .status(201)
      .json({ message: 'user created successfully', data: createuser });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const GetTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await db.teacher.findMany();

    if (!teachers) {
      return res.status(400).json({ message: 'no teachers found' });
    }

    return res.status(200).json({ message: 'teachers found', data: teachers });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const GetTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    const teacher = await db.teacher.findUnique({
      where: {
        id: id,
      },
    });

    if (!teacher) {
      return res.status(400).json({ message: 'teacher not found' });
    }

    return res.status(200).json({ message: 'teacher found', data: teacher });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const UpdateTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    const values = req.body;

    if (!values) {
      return res.status(400).json({ message: 'values are required' });
    }

    const teacher = await db.teacher.findUnique({
      where: {
        id: id,
      },
    });

    if (!teacher) {
      return res.status(400).json({ message: 'teacher not found' });
    }

    const newTeacher = await db.teacher.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });

    if (!newTeacher) {
      return res.status(400).json({ message: 'teacher not updated' });
    }

    return res.status(200).json({ message: 'teacher updated', data: teacher });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
