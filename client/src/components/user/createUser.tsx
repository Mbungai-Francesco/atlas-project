import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const {user} = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if(user){
      createUser()
    }
    else{
      console.log('No user found');
    }
  }, [ user ])
  
  const createUser = async () => {
    const response = await axios.post('http://localhost:5000/api/users', {
      username: user?.username,
      email: user?.emailAddresses[0].emailAddress,
      clerkId: user?.id
    })
    if(response.status === 400) {
      console.log('Failed to create user');
      navigate('/infoForm') 
    }
    if (response.status === 200 || response.status === 201) {
      console.log(response.status);
      console.log(response.data)
      localStorage.setItem("userId",JSON.stringify(response.data.data.id))
      navigate(`/infoForm/${response.data.data.id}`)
    }
  }

  // const createUser= () => {
  //   const sue = {
  //     username: user?.username,
  //     email: user?.emailAddresses[0].emailAddress,
  //     clerkId: user?.id
  //   }
  //   console.table(sue);
  // }

  return (
    <></>
  )
}

export default CreateUser