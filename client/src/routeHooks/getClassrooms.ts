import { ClassRoom } from "@/types";

const GetClassrooms = async () => {
  const response = await fetch('http://localhost:5000/api/classrooms', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    console.log('Failed to get classrooms');
    return [];
  }
  const data = await response.json();
  return data as ClassRoom[];  
}

export default GetClassrooms