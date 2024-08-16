import ClassRoom from "./classRoom"
import User from "./user"

export interface UserState{
  users: User[]
}
export interface UserAction {
  type: string,
  payload: User
}

export interface ClassState{
  classes: ClassRoom[]
}
export interface ClassAction {
  type: string,
  payload: ClassRoom
}