import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {	
  const {user} = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if(user){
      loginUser()
    }
    else{
      console.log('No user found');
    }
  }, [user])

  const loginUser = async () => {
    const response = await axios.post('http://localhost:5000/api/login', {
      clerkId: user?.id,
    })
    if(response.status === 400) {
      console.log('Failed to login');
    }
    if (response.status === 200 || response.status === 201) {
      console.log(response.status);
      console.log(response.data)
      localStorage.setItem("userId",JSON.stringify(response.data.data.id))
      if(response.data.data.usertype){
        navigate(`/myClassrooms`)
      }
      else{
        navigate(`/classrooms`)
      }
      
    }
  }

  return (
    <>
    </>
  )
}

export default Login;