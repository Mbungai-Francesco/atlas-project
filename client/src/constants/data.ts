import Attempt from "../types/attempt";
import ClassRoom from "../types/classRoom";
import Teacher from "../types/teacher";
import User from "../types/user";
import UserType from "../types/userType";
import Question from "../types/question";
import Topic from "../types/topic";
import Quiz from "../types/quiz";
import TopicContent from "../types/topicContent";
import ClassRoomContentType from "../types/classRoomContentType";

const attempts: Attempt[] = [
  {
    id: "a1",
    userId: "user1",
    quizId: "quiz1",
    score: 85,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "a2",
    userId: "user2",
    quizId: "quiz2",
    score: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const classRooms: ClassRoom[] = [
  {
    id: "classRoom1",
    name: "Math 101",
    studentIds: ["user1", "user2"],
    students: [], // Populate with User objects
    teacherId: ["teacher1"],
    teachers: [], // Populate with Teacher objects
    topics: [], // Populate with Topic objects
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const teachers: Teacher[] = [
  {
    id: "teacher1",
    name: "John Doe",
    subject: "Mathematics",
    email: "john.doe@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const users: User[] = [
  {
    id: "user1",
    username: "student1",
    firstname: "Alice",
    secondname: "Smith",
    classroomId: ["classRoom1"],
    studentclass: [], // Populate with ClassRoom objects
    age: 20,
    email: "alice.smith@example.com",
    attempt: [], // Populate with Attempt objects
    usertype: "STUDENT",
    clerkId: "clerk1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const userTypes: UserType[] = ["STUDENT", "TEACHER", "ADMIN"];

const questions: Question[] = [
  {
    id: "question1",
    text: "What is 2 + 2?",
    options: ["3", "4", "5"],
    correctOption: "4",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const topics: Topic[] = [
  {
    id: "topic1",
    name: "Algebra",
    description: "Introduction to Algebra",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const quizzes: Quiz[] = [
  {
    id: "quiz1",
    title: "Basic Math Quiz",
    questions: [], // Populate with Question objects
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const topicContents: TopicContent[] = [
  {
    id: "topicContent1",
    topicId: "topic1",
    content: "This is the content for Algebra.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const classRoomContentTypes: ClassRoomContentType[] = [
  {
    id: "classRoomContentType1",
    classRoomId: "classRoom1",
    content: "This is the content for Math 101.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export {
  attempts,
  classRooms,
  teachers,
  users,
  userTypes,
  questions,
  topics,
  quizzes,
  topicContents,
  classRoomContentTypes,
};