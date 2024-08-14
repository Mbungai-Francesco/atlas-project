import { User } from "@/types";
import { useState } from "react";

const GetUsers = async () =>{
  const [users, setUsers] = useState<User[]>([])
  try {
    const response = await fetch(`http://localhost:5000/api/users`)
    const data = await response.json()
    setUsers(data)
  } catch (error) {
    console.log(error);
  }
  return users
}

export default GetUsers