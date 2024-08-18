import ClassRoom from "./classRoom"
import Topic from "./topic"
import User from "./user"

export interface UserState{
  users: User[]
}
export interface UserAction {
  type: string,
  payload: User | User[]
}

export interface ClassState{
  classes: ClassRoom[]
}
export interface ClassAction {
  type: string,
  payload: ClassRoom | ClassRoom[]
}

export interface TopicState{
  topics: Topic[]
}
export interface TopicAction {
  type: string,
  payload: Topic | Topic[]
}