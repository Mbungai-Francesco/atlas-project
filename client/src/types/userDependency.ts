import User from "./user"

interface UserState{
  user: User
}
interface UserAction {
  type: string,
  payload: User
}

export type { UserState, UserAction }