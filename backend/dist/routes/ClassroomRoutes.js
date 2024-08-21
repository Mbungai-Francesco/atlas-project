"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClassroomController_1 = require("../controllers/ClassroomController");
const Classroomroutes = express_1.default.Router();
Classroomroutes.post('/classrooms', ClassroomController_1.CreateClassroom);
Classroomroutes.get('/classrooms', ClassroomController_1.GetClassrooms);
Classroomroutes.get('/myclassrooms', ClassroomController_1.GetMyClassrooms);
Classroomroutes.get('/classrooms/:id', ClassroomController_1.GetClassroom);
Classroomroutes.put('/classrooms/:id', ClassroomController_1.UpdateClassroom);
Classroomroutes.delete('/classrooms/:id', ClassroomController_1.DeleteClassroom);
exports.default = Classroomroutes;
