"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const db_1 = require("../lib/db");
const Login = async (req, res) => {
    try {
        const { clerkId } = await req.body;
        if (!clerkId) {
            return res.status(400).json({
                message: 'clerkId is required. please try again with this value added',
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
                .json({ message: 'user login successful', data: finduser });
        }
        // find teacher in db
        const findteacher = await db_1.db.teacher.findUnique({
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
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'internal server error' });
    }
};
exports.Login = Login;
