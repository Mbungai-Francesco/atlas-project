"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = exports.UpdateUser = exports.GetUser = exports.GetUsers = exports.CreateUser = void 0;
const db_1 = require("../lib/db");
const CreateUser = async (req, res) => {
    try {
        const { username, email, clerkId, usertype } = await req.body;
        if (!clerkId) {
            return res.status(400).json({
                message: 'clerkId is required. please try again with this value added',
            });
        }
        if (!username || !email) {
            return res.status(400).json({
                message: 'username, email and usertype are required. please try again with these values added',
            });
        }
        // find user in db
        const finduser = await db_1.db.user.findUnique({
            where: {
                clerkId,
            },
        });
        if (finduser) {
            return res
                .status(200)
                .json({ message: 'user already exists', data: finduser });
        }
        const toUpdate = {
            username,
            email,
            clerkId,
        };
        if (usertype) {
            const auth = req.headers.authorization?.split(' ')[1];
            if (!auth) {
                return res
                    .status(400)
                    .json({ message: 'admin authorization is required' });
            }
            const finduser = await db_1.db.user.findUnique({
                where: {
                    clerkId: auth,
                },
            });
            if (!finduser) {
                return res.status(400).json({ message: 'admin not found' });
            }
            if (finduser.usertype !== 'ADMIN') {
                return res.status(400).json({
                    message: 'only admin can create user with usertype',
                });
            }
            toUpdate['usertype'] = usertype;
        }
        const createuser = await db_1.db.user.create({
            data: {
                ...toUpdate,
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
exports.CreateUser = CreateUser;
const GetUsers = async (req, res) => {
    try {
        const getusers = await db_1.db.user.findMany({
            include: {
                StudentInClass: true,
            },
        });
        if (!getusers) {
            return res.status(400).json({ message: 'users not found' });
        }
        return res.status(200).json(getusers);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'internal server error' });
    }
};
exports.GetUsers = GetUsers;
const GetUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'id is required' });
        }
        const getuser = await db_1.db.user.findUnique({
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
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'internal server error' });
    }
};
exports.GetUser = GetUser;
const UpdateUser = async (req, res) => {
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
        const finduser = await db_1.db.user.findUnique({
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
                    if (await db_1.db.classRoom.findUnique({ where: { id: classroomId[i] } })) {
                        userClassRooms.push(classroomId[i]);
                    }
                    else {
                        return res.status(400).json({
                            message: 'classroom not found',
                        });
                    }
                }
                else {
                    return res.status(400).json({
                        message: 'user already in this class',
                    });
                }
            }
        }
        const valuesToBeUpdated = { classroomId: userClassRooms };
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
            if (values['secondname'] &&
                values['secondname'] !== finduser.secondname) {
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
        const updateuser = await db_1.db.user.update({
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
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'internal server error' });
    }
};
exports.UpdateUser = UpdateUser;
// delete user to be implemented for admin only
const DeleteUser = async (req, res) => {
    try {
        const auth = req.headers.authorization?.split(' ')[1];
        if (!auth) {
            return res.status(400).json({ message: 'authorization is required' });
        }
        const finduser = await db_1.db.user.findUnique({
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
        const deleteuser = await db_1.db.user.delete({
            where: {
                id: id,
            },
        });
        if (!deleteuser) {
            return res.status(400).json({ message: 'user not deleted' });
        }
        return res.status(200).json({ message: 'user deleted successfully' });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'internal server error' });
    }
};
exports.DeleteUser = DeleteUser;
