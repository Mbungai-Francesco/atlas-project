import Question from "./question";
import Quiz from "./quiz";
import User from "./user";

interface Attempt {
  id        :string,     //@id @default(auto()) @map("_id") @db.ObjectId
  score     :number,
  quizId    :string,     //@db.ObjectId
  quiz      :Quiz,       //@relation(fields: [quizId], references: [id], onDelete: Cascade)
  question  :Question[],
  answers   :string[],
  studentId :string,     //@db.ObjectId
  student   :User,       //@relation(fields: [studentId], references: [id], onDelete: Cascade)
  createdAt :Date,   //@default(now())
  updatedAt :Date,   //@updatedAt
}

export default Attempt