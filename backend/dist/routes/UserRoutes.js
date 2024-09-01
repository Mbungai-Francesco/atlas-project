"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const Userrouter = express_1.default.Router();
Userrouter.get('/users', UserController_1.GetUsers);
Userrouter.post('/users', UserController_1.CreateUser);
Userrouter.put('/users/:id', UserController_1.UpdateUser);
Userrouter.get('/users/:id', UserController_1.GetUser);
Userrouter.delete('/users/:id', UserController_1.DeleteUser);
exports.default = Userrouter;
