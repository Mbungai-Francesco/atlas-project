import { ClassRoom, User } from "@/types";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const getClassrooms = (classes:ClassRoom[], ids: string[]) =>{
  const outClasses : ClassRoom[] = []
  for (const item of classes) {
    for (const ele of ids) {
      if(item.id === ele){
        outClasses.push(item)
      }
    }
  }
  return outClasses
}

const StudentClassrooms = () => {
	const [user, setUser] = useState<User>();
  const [classes, setClasses] = useState<ClassRoom[]>([])

	useEffect(() => {
		GetUser();
	}, [user]);

	const GetUser = async () => {
		const id = localStorage.getItem("userId");
		if (!id) {
			console.log("No user ID found in localStorage");
			return null;
		}
		if (id) {
			try {
				const response = await fetch(`http://localhost:5000/api/users/${id}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setUser(data);
        GetClassrooms()
			} catch (error) {
				console.log(error);
			}
		}
	};

  const GetClassrooms = async () => {
		try {
      const response = await fetch(`http://localhost:5000/api/classrooms`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data : ClassRoom[] = await response.json();
      if(user) {
        setClasses(getClassrooms(data, user?.classroomId));
      }
      
    } catch (error) {
      console.log(error);
    }
	};

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>my Classrooms</CardTitle>
					<CardDescription>A step at a time, you'll get there</CardDescription>
				</CardHeader>
				<CardContent className="flex space-x-4">
          {classes.map(classin => (
            <Card>
            <CardHeader>
              <CardTitle>{classin.name}</CardTitle>
            </CardHeader>
          </Card>
          ))}
				</CardContent>
				<CardFooter>
				</CardFooter>
			</Card>
		</>
	);
};

export default StudentClassrooms;
