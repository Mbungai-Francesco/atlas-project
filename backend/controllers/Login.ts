import { db } from '../lib/db';
import { Request, Response } from 'express';

export const Login = async (req: Request, res: Response) => {
  try {
    const { clerkId } = await req.body;

    if (!clerkId) {
      return res.status(400).json({
        message: 'clerkId is required. please try again with this value added',
      });
    }

    // find user in db
    const finduser = await db.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (finduser) {
      return res
        .status(200)
        .json({ message: 'user login successful', data: finduser });
    }

    // find teacher in db
    const findteacher = await db.teacher.findUnique({
      where: {
        clerkId,
      },
    });

    if (findteacher) {
      return res
        .status(200)
        .json({ message: 'teacher login successful', data: findteacher });
    }

    return res.status(400).json({ message: 'user not found' });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};
