import { ClassRoom as classType, Teacher, User } from "@/types";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const ClassRoom = () => {
	const [teacher, setTeacher] = useState<Teacher>();
	const [classes, setClasses] = useState<classType[]>([]);

	useEffect(() => {
		GetTeacher();
		console.log("Teacher:", teacher);	
		
	}, []);

	const GetTeacher = async () => {
		const id = localStorage.getItem("teacherId");
		if (!id) {
			console.log("No teacher ID found in localStorage");
			return null;
		}
		if (id) {
			try {
				const response = await fetch(
					`http://localhost:5000/api/teachers/${id}`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setTeacher(data);
				GetClassrooms();
			} catch (error) {
				console.log(error);
			}
		}
	};

	const GetClassrooms = async () => {
		try {
			const authorizationHeader = `Bearer ${teacher?.clerkId}`
			// const authorizationHeader = "user_2kZLrxldPINZN0bFzL9j11WOPyr";
			console.log("Authorization Header:", authorizationHeader); // Log the authorization header
			const response = await fetch(`http://localhost:5000/api/myclassrooms`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"authorization": authorizationHeader
				},
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			else if (response.ok) {
				console.log("Response is OK");	
				
				const data: classType[] = await response.json();
				if (teacher) {
					setClasses(data);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Classrooms</CardTitle>
					<CardDescription>A step at a time, you'll get there</CardDescription>
				</CardHeader>
				<p>{teacher?.username}</p>
				<CardContent className="flex space-x-4">
					{classes.map((classin) => (
						<Card>
							<CardHeader>
								<CardTitle>{classin.name}</CardTitle>
							</CardHeader>
						</Card>
					))}
					<Link to={"/createClassroom"}>
						<Card aria-placeholder="moon">
							<CardHeader>
								<CardTitle>
									<Plus />
								</CardTitle>
							</CardHeader>
						</Card>
					</Link>
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</>
	);
};

export default ClassRoom;
