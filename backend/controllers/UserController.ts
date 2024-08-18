import { db } from '../lib/db';
import { Request, Response } from 'express';

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { username, email, clerkId, usertype } = await req.body;

    if (!clerkId) {
      return res.status(400).json({
        message: 'clerkId is required. please try again with this value added',
      });
    }

    if (!username || !email || !usertype) {
      return res.status(400).json({
        message:
          'username, email and usertype are required. please try again with these values added',
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
        usertype,
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
    const getusers = await db.user.findMany({
      include: {
        StudentInClass: true,
      },
    });

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
      include: {
        StudentInClass: true,
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
    const { classroomId, ...values } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    if (!values && !classroomId) {
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

    let userClassRooms = [...finduser.classroomId];

    if (classroomId && Array.isArray(classroomId)) {
      for (let i = 0; i < classroomId.length; i++) {
        if (!userClassRooms.includes(classroomId[i])) {
          if (
            await db.classRoom.findUnique({ where: { id: classroomId[i] } })
          ) {
            userClassRooms.push(classroomId[i]);
          } else {
            return res.status(400).json({
              message: 'classroom not found',
            });
          }
        } else {
          return res.status(400).json({
            message: 'user already in this class',
          });
        }
      }
    }

    const valuesToBeUpdated: any = { classroomId: userClassRooms };

    if (values) {
      if (values['clerkId']) {
        return res.status(400).json({
          message: 'clerkId cannot be updated. please try again',
        });
      }

      if (values['username'] && values['username'] !== finduser.username) {
        valuesToBeUpdated['username'] = values['username'];
      }

      if (values['firstname'] && values['firstname'] !== finduser.firstname) {
        valuesToBeUpdated['firstname'] = values['firstname'];
      }

      if (
        values['secondname'] &&
        values['secondname'] !== finduser.secondname
      ) {
        valuesToBeUpdated['secondname'] = values['secondname'];
      }

      if (values['email'] && values['email'] !== finduser.email) {
        valuesToBeUpdated['email'] = values['email'];
      }

      if (values['age'] && values['age'] !== finduser.age) {
        valuesToBeUpdated['age'] = values['age'];
      }

      if (values['usertype'] && values['usertype'] !== finduser.usertype) {
        valuesToBeUpdated['usertype'] = values['usertype'];
      }
    }

    const updateuser = await db.user.update({
      where: {
        id: id,
      },
      data: {
        ...valuesToBeUpdated,
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

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];
    if (!auth) {
      return res.status(400).json({ message: 'authorization is required' });
    }

    const finduser = await db.user.findUnique({
      where: {
        clerkId: auth,
      },
    });

    if (!finduser || finduser.usertype !== 'ADMIN') {
      return res.status(400).json({ message: 'user not found' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    const deleteuser = await db.user.delete({
      where: {
        id: id,
      },
    });

    if (!deleteuser) {
      return res.status(400).json({ message: 'user not deleted' });
    }

    return res.status(200).json({ message: 'user deleted successfully' });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};
