import Attempt from "./attempt";
import ClassRoom from "./classRoom";
import Teacher from "./teacher";
import User from "./user";
import UserType from "./userType";
import Question from "./question";
import Topic from "./topic";
import Quiz from "./quiz";
import TopicContent from "./topicContent";
import ClassRoomContentType from "./classRoomContentType";

export interface StudentsInClass{
  id        :string //@id @default(auto()) @map("_id") @db.ObjectId
  studentId :string //@db.ObjectId @unique
  student   :User   //@relation(fields: [studentId], references: [id])
  classRoomId :string //@db.ObjectId
  classRoom   :ClassRoom //@relation(fields: [classRoomId], references: [id])
  createdAt :Date //@default(now())
  updatedAt :Date //@updatedAt
}

export type {Attempt, ClassRoom, Teacher, User, Question, Topic, Quiz, TopicContent};
export { UserType, ClassRoomContentType };
