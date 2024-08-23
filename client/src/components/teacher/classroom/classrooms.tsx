import { Teacher } from "@/types";
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

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import CreateClassroom from "./createClassroom";
import { useDependencyContext } from "@/hooks/useDependencyContext";
import { Link } from "react-router-dom";
import { getMyClassrooms } from "@/api";

const ClassRooms = () => {
	const [teacher, setTeacher] = useState<Teacher>();
	// const [classes, setClasses] = useState<classType[]>([]);
	const id = localStorage.getItem("teacherId");
	const [openPopover, setOpenPopover] = useState(false);

	const { classState, classDispatch } = useDependencyContext();
	const { classes } = classState;

	useEffect(() => {
		console.log("id", id);
		console.log('classes', classes);
		
		if (id && teacher && classes.length ===0) {
			getMyClassrooms(teacher.clerkId).then((res) =>{
				if(res){
					if(teacher) {
						console.log(res);
						classDispatch({ type: "SET_CLASS", payload: res });
					}
				}
			})
			// const GetClassrooms = async () => {
			// 	try {
			// 		const authorizationHeader = `Bearer ${teacher?.clerkId}`;
			// 		// const authorizationHeader = "user_2kZLrxldPINZN0bFzL9j11WOPyr";
			// 		console.log("Authorization Header:", authorizationHeader); // Log the authorization header
			// 		const response = await fetch(
			// 			`http://localhost:5000/api/myclassrooms`,
			// 			{
			// 				method: "GET",
			// 				headers: {
			// 					"Content-Type": "application/json",
			// 					authorization: authorizationHeader,
			// 				},
			// 			}
			// 		);
			// 		if (!response.ok) {
			// 			throw new Error("Network response was not ok");
			// 		} else if (response.ok) {
			// 			console.log("Response is OK");
			// 			const data: classType[] = await response.json();
			// 			if (teacher) {
			// 				classDispatch({ type: "SET_CLASS", payload: data });
			// 				console.log(data);
			// 			}
			// 		}
			// 	} catch (error) {
			// 		console.log(error);
			// 	}
			// };

			// GetClassrooms();
			console.log("Teacher:", teacher);
		}
	}, [id, teacher]);

	useEffect(() => {
		if (!id) {
			console.log("No teacher ID found in localStorage");
			return;
		}
		const GetTeacher = async () => {
			if (id) {
				try {
					const response = await fetch(
						`http://localhost:5000/api/teachers/${id}`
					);
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return await response.json();
				} catch (error) {
					console.log(error);
					return null;
				}
			}
		};
		if (id) {
			GetTeacher().then((res) => (res ? setTeacher(res) : null));
		}
	}, [id]);

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Classrooms</CardTitle>
					<CardDescription>A step at a time, you'll get there</CardDescription>
				</CardHeader>
				{/* <p>{teacher?.username}</p>
				<p>{teacher?.clerkId}</p> */}
				<CardContent className="flex space-x-4">
					{classes.map((classin, id) => (
						<Card className="flex " key={id}>
							<Link to={`${classin.id}`} >
								<CardHeader>
									<CardTitle>{classin.name}</CardTitle>
									<CardDescription>
										topics {classin.topics ? classin.topics.length : "0"}
									</CardDescription>
								</CardHeader>
							</Link>
						</Card>
					))}
					<Popover open={openPopover} onOpenChange={setOpenPopover}>
						<PopoverTrigger>
							<Card aria-placeholder="moon">
								<CardHeader>
									<CardTitle>
										<Plus />
									</CardTitle>
								</CardHeader>
							</Card>
						</PopoverTrigger>
						<PopoverContent>
							<CreateClassroom
								setOpenPopover={setOpenPopover}
								clerkID={teacher?.clerkId}
								profID={id}
							/>
						</PopoverContent>
					</Popover>
					{/* <Link to={"/createClassroom"}></Link> */}
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</>
	);
};

export default ClassRooms;
