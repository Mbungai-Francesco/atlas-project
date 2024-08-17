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
import { useDependencyContext } from "@/hooks/useDependencyContext";

const StudentClassrooms = () => {
	const [user, setUser] = useState<User>();
	const { classState, classDispatch } = useDependencyContext();
	const { classes } = classState;
	const id = JSON.parse(localStorage.getItem("userId") || "");

	const getClassrooms = (classes: ClassRoom[], ids: string[]) => {
		const outClasses: ClassRoom[] = [];
		for (const item of classes) {
			for (const ele of ids) {
				if (item.id === ele) {
					outClasses.push(item);
					console.log(item);
					console.log(classes);
				}
			}
		}
		classDispatch({ type: "SET_CLASS", payload: outClasses });
		// console.log(outClasses);
		// return outClasses;
	};

	useEffect(()=>{
		const GetClassrooms = async () => {
			try {
				const response = await fetch(`http://localhost:5000/api/classrooms`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				if (response.ok) {
					const data: ClassRoom[] = await response.json();
					console.log(data);
					if (user) {
						getClassrooms(data, user?.classroomId);
					}
				}
			} catch (error) {
				console.log(error);
			}
		};
		if(user){
			GetClassrooms();
		}
		console.log(classes);
		
	}, [user])

	useEffect(() => {
		const GetUser = async () => {
			try {
				console.log("id", id);
				const response = await fetch(`http://localhost:5000/api/users/${id}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				if (response.ok) {
					const data = await response.json();
					console.log(data);
					setUser(data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (id) {
			console.log("id", id);
			GetUser();
		}
		if (!id) {
			console.log("No user ID found in localStorage");
		}
	}, [id]);

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>my Classrooms</CardTitle>
					<CardDescription>A step at a time, you'll get there</CardDescription>
				</CardHeader>
				{
					<CardContent className="flex space-x-4">
						<p className={classes.length == 0 ? "block" : "hidden"}>
							loading ...
						</p>
						{classes.map((classin) => (
							<Card key={classin.id}>
								<CardHeader>
									<CardTitle>{classin.name}</CardTitle>
									<CardDescription>topics {classin.topics ? classin.topics.length  : "0"}</CardDescription>
								</CardHeader>
							</Card>
						))}
					</CardContent>
				}
				<CardFooter></CardFooter>
			</Card>
		</>
	);
};

export default StudentClassrooms;
