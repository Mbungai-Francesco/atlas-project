import axios from "axios"
import { ClassRoom, Teacher, Topic, User } from "./types"

interface topicProps{
  name: string,
  classRoomId: string
}

export const createClassroom = async (clerkId: string,data:{name: string,teacherId: string, topic : Topic[]} ) => {
  try{
    const config = {
      headers: {
        authorization: `Bearer ${clerkId}`
      }
    }
		console.log("Authorization Header:", config.headers); // Log the authorization header
		const res = await axios.post("http://localhost:5000/api/classrooms", data, config)
    if(res.status === 200){
      console.log("message", res.statusText);
      console.log(res.data.data);
      return res.data.data as ClassRoom
    }
    else console.log("message", res.statusText);
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const deleteClassroom = async (clerkId: string, classId: string) =>{
  try{
    const config = {
      headers: {
        authorization: `Bearer ${clerkId}`
      }
    }
    const res = await axios.delete(`http://localhost:5000/api/classrooms/${classId}`,config)
    if(res.status === 200){
      console.log("message", res.statusText);
      console.log(res.data.data);
      return res.data.data as ClassRoom
    }
    else console.log("message", res.statusText);
  }
  catch(error){
    console.error('Error:', error);
  }
}

export const updateClassroom = async (clerkId: string, classRoom:ClassRoom, teachId: string) =>{
  try{
    const config = {
      headers: {
        authorization: `Bearer ${clerkId}`
      }
    }
    const {id,teachers,students,createdAt,updatedAt, ...classNoId} = classRoom
    console.log(id,teachers,students,createdAt,updatedAt);
    const data ={
      ...classNoId
    }
    console.log(data);
    console.log('classroomID',classRoom.id);
    const res = await axios.put(`http://localhost:5000/api/classrooms/${classRoom.id}`,data,config)
    if(res.status === 200){
      console.log("message", res.statusText);
      return res.data.data as ClassRoom
    }
  }
  catch(error){
    console.error('Error:', error);
  }
}

export const  getClassrooms = async() =>{
  try {
    const response = await axios.get("http://localhost:5000/api/classrooms")
    if(response.status === 200){
      console.log("message", response.statusText);
      console.log(response.data);
      return response.data as ClassRoom[]
    }
    else console.log("message", response.statusText);
  } catch (error) {
    console.log(error);
    return null
  }
}

export const getMyClassrooms = async (clerkId: string) =>{
  try{
    const config = {
      headers: {
        authorization: `Bearer ${clerkId}`
      }
    }
    const res = await axios.get(`http://localhost:5000/api/myclassrooms`,config)
    if(res.status === 200){
      console.log("message", res.statusText);
      console.log(res.data);
      return res.data as ClassRoom[]
    }
  }
  catch(error){
    console.error('Error:', error);
  }
}

export const teacherClasses = async (clerkId: string) =>{
  try{
    const config = {
      headers: {
        authorization: `Bearer ${clerkId}`
      }
    }
    const res = await axios.put(`http://localhost:5000/api/myclassrooms`,config)
    if(res.status === 201){
      console.log("message", res.statusText);
      return res.data.data as ClassRoom[]
    }
  }
  catch(error){
    console.error('Error:', error);
  }
}

export const getTeacher = async (teachId: string) => {
  try{
    const res = await axios.get(`http://localhost:5000/api/teachers/${teachId}`)
    if(res.status === 200){
      console.log("message", res.statusText);
      console.log(res.data);
      return res.data as Teacher
    }
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const updateTeacher = async (clerkId: string, data : Teacher) => {
  try{
    const { id,classrooms, ...dataNoId } = data;
    console.log(id,classrooms);
    const res = await axios.put(`http://localhost:5000/api/teachers/${id}`,dataNoId)
    if(res.status === 200){
      console.log("message", res.statusText);
      return res.data.data as Teacher
    }
    else console.log("message", res.statusText);
  }
  catch(error){
    console.error('Error:', error);
  }
}

export const createTopic = async (clerkId: string, data: topicProps) =>{
  try{
    const config = {
      headers: {
        authorization: `Bearer ${clerkId}`
      }
    }
    const res = await axios.post(`http://localhost:5000/api/topics`,data,config)
    if(res.status === 201){
      console.log("message", res.statusText);
      console.log(res.data.data);
      return res.data.data as Topic
    }
  }
  catch(error){
    console.error('Error:', error);
  }
}

export const getTopics = async () =>{
  try {
    const response = await axios.get("http://localhost:5000/api/topics")
    if(response.status === 200){
      console.log("message", response.statusText);
      console.log(response.data);
      return response.data as Topic[]
    }
    else console.log("message", response.statusText);
  } catch (error) {
    console.log(error);
    return null
  }
}

export const updateUser = async (userId: string,data : User) => {
  try {
    // console.log(userId);
    const config = {
      headers: {
        authorization: `Bearer ${userId}`
      }
    }
    const { id,StudentInClass, ...dataNoId } = data;
    console.log(id,StudentInClass);
    const res = await axios.put(`http://localhost:5000/api/users/${userId}`, dataNoId, config);
    if(res.status === 200){
      console.log("message", res.statusText);
      return res.data.data as User
    }
    // dispatch({type: 'SET_USER', payload: response.data.data})
  } catch (error) {
    console.error('Error:', error);
  }
}

export const getUser = async (userId: string) => {
  try{
    console.log(userId);
    
    const res = await axios.get(`http://localhost:5000/api/users/${userId}`)
    if(res.status === 200){
      console.log("message", res.statusText);
      console.log(res.data);
      return res.data as User
    }
  }
  catch(error){
    console.error('Error:', error);
  }
}