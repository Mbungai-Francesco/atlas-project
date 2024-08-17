import { teacherClasses } from "@/api";
import { useDependencyContext } from "@/hooks/useDependencyContext";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {	
  const {user} = useUser()
  const navigate = useNavigate()
  const { classDispatch } = useDependencyContext()
  const { dispatch } = useDependencyContext()

  useEffect(() => {
    if(user){
      loginUser()
    }
    else{
      console.log('No user found');
    }
  }, [user])

  const loginUser = async () => {
    if(user){
      const response = await axios.post('http://localhost:5000/api/login', {
        clerkId: user.id,
      })
      if(response.status === 400) {
        console.log('Failed to login');
      }
      if (response.status === 200 || response.status === 201) {
        console.log(response.status);
        console.log(response.data)
        if(response.data.data.usertype){
          localStorage.setItem("userId",JSON.stringify(response.data.data.id))
          localStorage.setItem('type',"stud")
          dispatch({type: 'SET_USER', payload: [response.data]})
          navigate(`/myClassrooms`)
        }
        else{
          localStorage.setItem("teacherId",response.data.data.id)
          localStorage.setItem('type',"teach")
          teacherClasses(user.id)
          .then((res) => {
            if(res != undefined){
              classDispatch({type: "SET_CLASS", payload: res})
            }
            else return null
          })
          navigate(`/classrooms`)
        }
      }
    }
  }

  return (
    <>
    </>
  )
}

export default Login;