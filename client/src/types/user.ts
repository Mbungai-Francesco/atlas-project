import { StudentsInClass } from "."
import Attempt from "./attempt"
import ClassRoom from "./classRoom"
import UserType from "./userType"


interface User{
  id          :string,      //@id @default(auto()) @map("_id") @db.ObjectId
  username    :string,      //@unique
  firstname   ?:string,
  secondname  ?:string,
  classroomId :string[],   //@db.ObjectId
  studentclass:ClassRoom[],//@relation(fields: [classroomId], references: [id])
  age         ?:number,
  email       :string,      //@unique
  attempt     :Attempt[]
  usertype    :UserType,   //@default(STUDENT)
  clerkId     :string,      //@unique
  createdAt   :Date,    //@default(now())
  updatedAt   :Date,
  StudentInClass :StudentsInClass[] //@relation("StudentInClass")
}

export default User