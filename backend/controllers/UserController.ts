import { db } from '../lib/db';
import { Request, Response } from 'express';

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { username, email, clerkId, classroomId } = await req.body;

    if (!clerkId) {
      res.status(400).json({
        message: 'clerkId is required. please try again with this value added',
      });
    }

    if (!username || !email || !classroomId) {
      res.status(400).json({
        message:
          'username, email and classes are required. please try again with these values added',
      });
    }

    // find user in db
    const finduser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (finduser) {
      res.status(400).json({ message: 'user already exists', data: finduser });
    }

    const createuser = await db.user.create({
      data: {
        username,
        email,
        classroomId,
        clerkId,
      },
    });

    if (!createuser) {
      res.status(400).json({ message: 'user not created' });
    }

    res
      .status(201)
      .json({ message: 'user created successfully', data: createuser });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const GetUsers = async (req: Request, res: Response) => {
  try {
    const getusers = await db.user.findMany();

    if (!getusers) {
      res.status(400).json({ message: 'users not found' });
    }

    res.status(200).json({ message: 'users found', data: getusers });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { id, username, email, firstname, secondname, classroomId, age } =
      await req.body;

    if (!id) {
      res.status(400).json({ message: 'id is required' });
    }

    if (!email) {
      res.status(400).json({ message: 'email is required' });
    }

    if (!username) {
      res.status(400).json({ message: 'username is required' });
    }

    const finduser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!finduser) {
      res.status(400).json({ message: 'user not found' });
    }

    const updateuser = await db.user.update({
      where: {
        id: id,
      },
      data: {
        username,
        email,
        firstname: firstname ? firstname : finduser?.firstname,
        secondname: secondname ? secondname : finduser?.secondname,
        classroomId,
        age: age ? age : finduser?.age,
      },
    });

    if (!updateuser) {
      res.status(400).json({ message: 'user not updated' });
    }

    res.status(200).json({ message: 'user updated', data: updateuser });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'id is required' });
    }

    const finduser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!finduser) {
      res.status(400).json({ message: 'user not found' });
    }

    res.status(200).json({ message: 'user found', data: finduser });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: 'internal server error' });
  }
};

// delete user to be implemented for admin only
