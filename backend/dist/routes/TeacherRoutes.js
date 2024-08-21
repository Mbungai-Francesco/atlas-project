"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TeacherController_1 = require("../controllers/TeacherController");
const Userrouter = express_1.default.Router();
Userrouter.get('/teachers', TeacherController_1.GetTeachers);
Userrouter.post('/teachers', TeacherController_1.CreateTeacher);
Userrouter.put('/teachers/:id', TeacherController_1.UpdateTeacher);
Userrouter.get('/teachers/:id', TeacherController_1.GetTeacher);
exports.default = Userrouter;
