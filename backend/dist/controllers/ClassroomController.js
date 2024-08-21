"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClassroom = exports.UpdateClassroom = exports.GetClassroom = exports.GetClassrooms = exports.GetMyClassrooms = exports.CreateClassroom = void 0;
const db_1 = require("../lib/db");
const CreateClassroom = async (req, res) => {
    try {
        const auth = req.headers.authorization?.split(' ')[1];
        if (!auth) {
            return res
                .status(400)
                .json({ message: 'missing clerkId in authorization header' });
        }
        const teacher = await db_1.db.teacher.findUnique({
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
        const findclassroom = await db_1.db.classRoom.findUnique({
            where: {
                name: name.toLowerCase(),
            },
        });
        if (findclassroom) {
            return res.status(400).json({ message: 'class already exists' });
        }
        const createclassroom = await db_1.db.classRoom.create({
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
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'internal server error' });
    }
};
exports.CreateClassroom = CreateClassroom;
const GetMyClassrooms = async (req, res) => {
    try {
        const auth = req.headers.authorization?.split(' ')[1];
        if (!auth) {
            return res
                .status(400)
                .json({ message: 'missing clerkId in authorization header' });
        }
        const teacher = await db_1.db.teacher.findUnique({
            where: {
                clerkId: auth,
            },
        });
        if (!teacher) {
            return res.status(401).json({ message: 'unauthorized access' });
        }
        const classrooms = await db_1.db.classRoom.findMany({
            where: {
                teacherId: {
                    hasSome: [teacher.id],
                },
            },
            include: {
                topics: true,
            },
        });
        return res.status(200).json(classrooms);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'internal server error' });
    }
};
exports.GetMyClassrooms = GetMyClassrooms;
const GetClassrooms = async (req, res) => {
    try {
        const classrooms = await db_1.db.classRoom.findMany({
            include: {
                topics: true,
                teachers: true,
            },
        });
        return res.status(200).json(classrooms);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'internal server error' });
    }
};
exports.GetClassrooms = GetClassrooms;
const GetClassroom = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'classroom id is required' });
        }
        const classroom = await db_1.db.classRoom.findUnique({
            where: {
                id: id,
            },
            include: {
                topics: true,
                teachers: true,
            },
        });
        if (!classroom) {
            return res.status(400).json({ message: 'classroom not found' });
        }
        return res.status(200).json(classroom);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'internal server error' });
    }
};
exports.GetClassroom = GetClassroom;
const UpdateClassroom = async (req, res) => {
    try {
        const auth = req.headers.authorization?.split(' ')[1];
        if (!auth) {
            return res
                .status(400)
                .json({ message: 'missing teacher clerkId in authorization header' });
        }
        const teacher = await db_1.db.teacher.findUnique({
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
        const findclassroom = await db_1.db.classRoom.findUnique({
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
        let updatedTeacherIds = [];
        if (!values && !teacherId) {
            return res.status(400).json({ message: 'new values are required' });
        }
        if (teacherId) {
            teacherId.forEach(async (id) => {
                const teacher = await db_1.db.teacher.findUnique({
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
            updatedTeacherIds = [...(existingTeachers || []), ...teacherId].filter(Boolean);
        }
        const updateclassroom = await db_1.db.classRoom.update({
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
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'internal server error' });
    }
};
exports.UpdateClassroom = UpdateClassroom;
const DeleteClassroom = async (req, res) => {
    try {
        const auth = req.headers.authorization?.split(' ')[1];
        if (!auth) {
            return res
                .status(400)
                .json({ message: 'missing teacher clerkId in authorization header' });
        }
        const teacher = await db_1.db.teacher.findUnique({
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
        const findclassroom = await db_1.db.classRoom.findUnique({
            where: {
                id: id,
            },
        });
        if (!findclassroom) {
            return res.status(400).json({ message: 'classroom not found' });
        }
        const deleteclassroom = await db_1.db.classRoom.delete({
            where: {
                id: id,
            },
        });
        return res.status(200).json({
            message: 'classroom deleted successfully',
            data: deleteclassroom,
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'internal server error' });
    }
};
exports.DeleteClassroom = DeleteClassroom;
