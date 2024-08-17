import Teacher from "./teacher";
import Topic from "./topic";
import User from "./user";

interface ClassRoom {
  id         :string,       //@id @default(auto()) @map("_id") @db.ObjectId
  name       :string,
  students   ?:User[],       //@relation(fields: [studentIds], references: [id])
  teacherId  :string[],     //@db.ObjectId
  teachers   ?:Teacher[],    //@relation(fields: [teacherId], references: [id])
  topics     :Topic[] ,
  createdAt  :Date,     //@default(now())
  updatedAt  :Date,    //@updatedAt
}

export default ClassRoom