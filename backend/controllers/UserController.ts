import { db } from '../lib/db';
import { Request, Response } from 'express';

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { username, email, clerkId, ...others } = await req.body;

    if (!clerkId) {
      return res.status(400).json({
        message: 'clerkId is required. please try again with this value added',
      });
    }

    if (!username || !email) {
      return res.status(400).json({
        message:
          'username, email and classes are required. please try again with these values added',
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
        .json({ message: 'user already exists', data: finduser });
    }

    const createuser = await db.user.create({
      data: {
        username,
        email,
        clerkId,
        ...others,
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

export const GetUsers = async (req: Request, res: Response) => {
  try {
    const getusers = await db.user.findMany();

    if (!getusers) {
      return res.status(400).json({ message: 'users not found' });
    }

    return res.status(200).json(getusers);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

export const GetUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    const getuser = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!getuser) {
      return res.status(400).json({ message: 'user not found' });
    }

    return res.status(200).json(getuser);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];
    if (!auth) {
      return res.status(400).json({ message: 'authorization is required' });
    }

    const { id } = req.params;
    const values = req.body;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    if (!values) {
      return res.status(400).json({ message: 'values are required' });
    }

    const finduser = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!finduser) {
      return res.status(400).json({ message: 'user not found' });
    }

    const updateuser = await db.user.update({
      where: {
        id: id,
      },
      data: {
        ...values,
      },
    });

    if (!updateuser) {
      return res.status(400).json({ message: 'user not updated' });
    }

    return res
      .status(200)
      .json({ message: 'user updated successfully', data: updateuser });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};
// delete user to be implemented for admin only
