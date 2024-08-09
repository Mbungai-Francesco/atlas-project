import Attempt from "./attempt"
import Question from "./question"
import Topic from "./topic"

interface Quiz {
  id        :string,     //@id @default(auto()) @map("_id") @db.ObjectId
  name      :string,
  topicId   :string,     //@db.ObjectId
  topic     :Topic,      //@relation(fields: [topicId], references: [id], onDelete: Cascade)
  questions :Question[],
  attempts  :Attempt[],
  createdAt :Date,   //@default(now())
  updatedAt :Date,   //@updatedAt
}

export default Quiz