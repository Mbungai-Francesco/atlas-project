import Attempt from "./attempt";
import Quiz from "./quiz";

interface Question {
  id        :string,   //@id @default(auto()) @map("_id") @db.ObjectId
  question  :string,
  options   :string[],
  answer    :string,
  quizId    :string,   //@db.ObjectId
  quiz      :Quiz,     //@relation(fields: [quizId], references: [id], onDelete: Cascade)
  createdAt :Date, //@default(now())
  updatedAt :Date, //@updatedAt
  Attempt   ?:Attempt, //@relation(fields: [attemptId], references: [id])
  attemptId ?:string,  //@db.ObjectId
}

export default Question