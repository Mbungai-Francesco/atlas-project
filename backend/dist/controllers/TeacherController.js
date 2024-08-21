"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTeacher = exports.GetTeacher = exports.GetTeachers = exports.CreateTeacher = void 0;
const db_1 = require("../lib/db");
const CreateTeacher = async (req, res) => {
    try {
        const { username, email, clerkId, teachingsubject } = await req.body;
        if (!clerkId) {
            return res.status(400).json({
                message: 'clerkId is required. please try again with this value added',
            });
        }
        if (!username || !email || !teachingsubject) {
            return res.status(400).json({
                message: 'username, email and subject teaching are required. please try again with these values added',
            });
        }
        // find user in db
        const finduser = await db_1.db.teacher.findUnique({
            where: {
                email,
            },
        });
        if (finduser) {
            return res
                .status(400)
                .json({ message: 'user already exists', data: finduser });
        }
        const createuser = await db_1.db.teacher.create({
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
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.CreateTeacher = CreateTeacher;
const GetTeachers = async (req, res) => {
    try {
        const teachers = await db_1.db.teacher.findMany();
        if (!teachers) {
            return res.status(400).json({ message: 'no teachers found' });
        }
        return res.status(200).json(teachers);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.GetTeachers = GetTeachers;
const GetTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'id is required' });
        }
        const teacher = await db_1.db.teacher.findUnique({
            where: {
                id: id,
            },
        });
        if (!teacher) {
            return res.status(400).json({ message: 'teacher not found' });
        }
        return res.status(200).json(teacher);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.GetTeacher = GetTeacher;
const UpdateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'id is required' });
        }
        const values = req.body;
        if (!values) {
            return res.status(400).json({ message: 'values are required' });
        }
        const teacher = await db_1.db.teacher.findUnique({
            where: {
                id: id,
            },
        });
        if (!teacher) {
            return res.status(400).json({ message: 'teacher not found' });
        }
        const newTeacher = await db_1.db.teacher.update({
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
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.UpdateTeacher = UpdateTeacher;
// delete teacher to be implemented for admin only
