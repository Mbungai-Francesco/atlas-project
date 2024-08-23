import ClassRoom from "./classRoom"
import Quiz from "./quiz"
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

export interface QuizState{
  quiz: Quiz
}
export interface QuizAction {
  type: string,
  num: number,
  payload: Quiz
}