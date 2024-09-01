"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
require('../routes/UserRoutes');
const UserRoutes_1 = __importDefault(require("../routes/UserRoutes"));
const TeacherRoutes_1 = __importDefault(require("../routes/TeacherRoutes"));
const ClassroomRoutes_1 = __importDefault(require("../routes/ClassroomRoutes"));
const Login_1 = __importDefault(require("../routes/Login"));
const QuizRoutes_1 = __importDefault(require("../routes/QuizRoutes"));
const TopicRoutes_1 = __importDefault(require("../routes/TopicRoutes"));
// import StudentInClassRoutes from '../routes/StudetnInClassRoutes';
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to ATLAS API services...' });
});
app.use('/api', UserRoutes_1.default, TeacherRoutes_1.default, ClassroomRoutes_1.default, Login_1.default, QuizRoutes_1.default, TopicRoutes_1.default);
app.get('*', (req, res) => {
    res.status(404).json({ message: 'You are OUT OF BOUNDARIES!!!' });
});
app.listen(5000, () => {
    console.log('server running on port 5000 : http://localhost:5000');
});
