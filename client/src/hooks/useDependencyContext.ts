import { DependencyContext } from "@/context/dependencyContext";
import { useContext } from "react";

export const useDependencyContext = () =>{
  const context = useContext(DependencyContext);
  if(!context){
    throw new Error('useDependencyContext must be used within a WorkoutProvider');
  }
  return context;
}