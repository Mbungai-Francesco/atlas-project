import { Request, Response } from 'express';
import { db } from '../lib/db';

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
