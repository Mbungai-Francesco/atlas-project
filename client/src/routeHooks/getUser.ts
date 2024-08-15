import { User } from "@/types";

export const GetUser = async () =>{
  const id = localStorage.getItem('userId')
  if (!id) {
    console.log('No user ID found in localStorage');
    return null;
  }
  try {
    const response = await fetch(`http://localhost:5000/api/users/${id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json()
    return data as User
  } catch (error) {
    console.log(error);
    return null
  }
}

GetUser().then(user => {
  if(user) {return user}
})