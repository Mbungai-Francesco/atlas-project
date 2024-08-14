import { ReactNode } from "react"
import { useSession } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children} : {children: ReactNode}) =>{

  const { isloaded, session} = useSession()

  if(!session?.user){
    return <Navigate to="/"/>
  }

  return (
    <>{children}</>
  )
} 

export default ProtectedRoute