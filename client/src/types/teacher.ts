import ClassRoom from "./classRoom"

interface Teacher {
  id              :string,       //@id @default(auto()) @map("_id") @db.ObjectId
  email           :string,       //@unique
  username        :string,       //@unique
  firstname       ?:string
  secondname      ?:string
  clerkId         :string,       //@unique
  teachingsubject :string,
  classroomId     :string[],     //@db.ObjectId
  classrooms      :ClassRoom[],  //@relation(fields: [classroomId], references: [id])
  createdAt       :Date,     //@default(now())
  updatedAt       :Date,     //@updatedAt
}

export default Teacher