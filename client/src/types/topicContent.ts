import classRoomContentType from "./classRoomContentType";
import Topic from "./topic";

interface TopicContent {
  id          :string,              //@id @default(auto()) @map("_id") @db.ObjectId
  topicId     :string,              //@db.ObjectId
  contenttpye :classRoomContentType, //@default(PDF)
  content     :string,
  topic       :Topic,              //@relation(fields: [topicId], references: [id], onDelete: Cascade)
  createdAt   :Date,             //@default(now())
  updatedAt   :Date,             //@updatedAt
}

export default TopicContent