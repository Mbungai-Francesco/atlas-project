import { ClassRoom, User } from "@/types";
import { useEffect, useState } from "react";
import { getClassrooms as apiGetClassrooms } from "@/api";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useDependencyContext } from "@/hooks/useDependencyContext";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { getUser, updateUser } from "@/api";

const StudentClassrooms = () => {
	const [user, setUser] = useState<User>();
	const { classState, classDispatch, dispatch } = useDependencyContext();
	const { classes } = classState;
	const [otherClasses, setOtherClasses] = useState<ClassRoom[]>();
	const id = JSON.parse(localStorage.getItem("userId") || "");

	const getNewClass = (vals: string) => {
		// console.log(vals);

		if (id && user) {
			user.classroomId = []
			user.classroomId.push(vals);
			updateUser(id, user).then((inres) => {
				console.log(inres);
				if (inres) {
					dispatch({ type: "SET_USER", payload: inres });
					setUser(inres);
				} else return null;
			});
		}
	};

	const getClassrooms = (Classes: ClassRoom[], ids: string[]) => {
		const inClasses: ClassRoom[] = [];
		const outClasses = Classes;
		console.log("ids", ids);
		console.log("Classes", Classes);
		for (const item of Classes) {
			console.log(item.name);
			for (const ele of ids) {
				// console.log(`${item.id} == ${ele}, ${item.id == ele}`);
				if (item.id == ele) {
					inClasses.push(item);
					outClasses.splice(outClasses.indexOf(item), 1);
				}
			}
		}
		console.log("inClasses", inClasses);
		setOtherClasses(outClasses);
		classDispatch({ type: "SET_CLASS", payload: inClasses });
		// console.log(outClasses);
		// return outClasses;
	};

	useEffect(() => {
		const GetClassrooms = async () => {
			apiGetClassrooms().then((res) => {
				if (res && user) {
					getClassrooms(res, user?.classroomId);
				}
			});
		};
		if (user) {
			GetClassrooms();
		}
		console.log(classes);
	}, [user]);

	useEffect(() => {
		const GetUser = async () => {
			getUser(id).then((res) => {
				if (res) {
					setUser(res);
				}
			});
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
				<CardContent className="flex space-x-4">
					{
						<>
							<p className={classes.length == 0 ? "block" : "hidden"}>
								loading ...
							</p>
							{classes.map((classin) => (
								<Card key={classin.id}>
									<CardHeader>
										<CardTitle>{classin.name}</CardTitle>
										<CardDescription>
											topics {classin.topics ? classin.topics.length : "0"}
										</CardDescription>
									</CardHeader>
								</Card>
							))}
						</>
					}

					<DropdownMenu>
						<DropdownMenuTrigger>
							<Card aria-placeholder="moon">
								<CardHeader>
									<CardTitle>
										<Plus />
									</CardTitle>
								</CardHeader>
							</Card>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Classrooms</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{otherClasses?.map((classOut) => (
								<DropdownMenuItem onClick={() => getNewClass(classOut.id)}>
									{classOut.name}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</>
	);
};

export default StudentClassrooms;
