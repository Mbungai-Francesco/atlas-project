import { User } from "@/types";

const GetUser = async (id :string) =>{
  try {
    const response = await fetch(`http://localhost:5000/api/users/${id}`)
    const data = await response.json()
    return data as User
  } catch (error) {
    console.log(error);
  }
}

export default GetUser