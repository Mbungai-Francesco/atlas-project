import ClassRoom from "./classRoom"
import Quiz from "./quiz"
import TopicContent from "./topicContent"

interface Topic {
  id           :string,         //@id @default(auto()) @map("_id") @db.ObjectId
  name         :string,
  classRoomId  :string,         //@db.ObjectId
  classRoom    :ClassRoom,      //@relation(fields: [classRoomId], references: [id], onDelete: Cascade)
  topicContent :TopicContent[],
  quizzes      :Quiz[],
  createdAt    :Date,       //@default(now())
  updatedAt    :Date,       //@updatedAt
}

export default Topic