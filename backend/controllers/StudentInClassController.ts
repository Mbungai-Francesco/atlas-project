// import { Request, Response } from 'express';
// import { db } from '../lib/db';

// export const AddStudentToClass = async (req: Request, res: Response) => {
//   try {
//     const auth = req.headers.authorization?.split(' ')[1];

//     if (!auth) {
//       return res.status(400).json({ message: 'Authorization is required' });
//     }

//     const { studentId, classRoomId } = req.body;

//     if (!studentId) {
//       return res.status(400).json({ message: 'Student ID is required' });
//     }

//     if (!classRoomId) {
//       return res.status(400).json({ message: 'ClassRoom ID is required' });
//     }

//     const student = await db.user.findUnique({ where: { id: studentId } });

//     if (!student || student.usertype !== 'STUDENT') {
//       return res.status(400).json({ message: 'Student does not exist' });
//     }

//     const classRoom = await db.classRoom.findUnique({
//       where: { id: classRoomId },
//     });

//     if (!classRoom) {
//       return res.status(400).json({ message: 'ClassRoom does not exist' });
//     }

//     // verify if the student is already in the class
//     const studentInClass = await db.studentsInClass.findFirst({
//       where: { studentId, classRoomId },
//     });

//     if (studentInClass) {
//       return res
//         .status(400)
//         .json({ message: 'Student already added to class' });
//     }

//     const studentAdded = await db.studentsInClass.create({
//       data: {
//         studentId,
//         classRoomId,
//       },
//     });

//     if (!studentAdded) {
//       return res.status(400).json({ message: 'Student not added to class' });
//     }

//     return res.status(200).json({
//       message: 'Student added to class successfully',
//       data: studentAdded,
//     });
//   } catch (error: any) {
//     console.error(error.message);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
