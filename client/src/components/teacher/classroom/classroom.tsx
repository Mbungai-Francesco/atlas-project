import { useDependencyContext } from "@/hooks/useDependencyContext";
import { ClassRoom, Topic } from "@/types";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import CreateTopic from "./createTopic";
import { deleteClassroom, getTeacher, updateTeacher } from "@/api";
import { useClerk } from "@clerk/clerk-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Classroom = () => {
	const { user } = useClerk();
	const teachId = localStorage.getItem("teacherId");
	// const [ classID, setClassID ] = useState<string>('')
	const { classID } = useParams<{ classID: string }>();
	const [classroom, setClassroom] = useState<ClassRoom>();
	const { classState, classDispatch } = useDependencyContext();
	const { classes } = classState;
	const [openPopover, setOpenPopover] = useState(false);
	const [delClassOpenPopover, setDelClassOpenPopover] = useState(false);
	const navigate = useNavigate();

	const deleteClass = () => {
		if (user && classID) {
			deleteClassroom(user.id, classID).then((res) => {
				if (res) {
					console.log("res", res);
					classDispatch({ type: "DELETE_CLASS", payload: res });
					if (teachId) {
						getTeacher(teachId).then((res) => {
							if (res) {
								res.classroomId = res.classroomId.filter(
									(item) => item !== classID
								);
								updateTeacher(user.id, res);
							}
						});
					}
					navigate("/classrooms");
				}
			});
		}
	};

	useEffect(() => {
		console.log("classID", classID);
		const topics: Topic[] = [];
		let room: ClassRoom;
		console.log("classes", classes);
		for (const item of classes) {
			if (item.id === classID) {
				if (!item.topics) {
					room = { ...item, topics };
				} else room = { ...item };
				console.log(room);
				setClassroom(room);
				console.log("classroom", classroom);
			}
		}
	}, [classes]);

	return (
		<>
			{classroom && (
				<div className="flex flex-col space-y-4 justify-between h-full">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[85%]">
						<Card className="h-fit max-h-full">
							<CardHeader>
								<CardTitle>{classroom?.name}</CardTitle>
								{/* <CardDescription>Card Description</CardDescription> */}
							</CardHeader>
							<CardContent>
								<Table>
									{/* <TableCaption>Notes</TableCaption> */}
									<TableHeader>
										<TableRow>
											<TableHead className="w-[100px]">Topics</TableHead>
											<TableHead className="text-right">Date created</TableHead>
											<TableHead className="text-right">
												Last modified
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody className="h-full">
										{classroom?.topics?.map((topic) => (
											<TableRow key={topic.id}>
												<TableCell className="font-medium">
													{topic.name}
												</TableCell>
												<TableCell className="text-right">
													{String(topic.createdAt).slice(0, 10)}
												</TableCell>
												<TableCell className="text-right">
													{String(topic.updatedAt).slice(0, 10)}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
							<CardFooter>
								<div className="flex justify-between w-full">
									<p>Notes</p>
									<Popover open={openPopover} onOpenChange={setOpenPopover}>
										<PopoverTrigger>
											<Button>New topic</Button>
										</PopoverTrigger>
										<PopoverContent>
											<CreateTopic
												setOpenPopover={setOpenPopover}
												classroom={classroom}
											/>
										</PopoverContent>
									</Popover>
								</div>
							</CardFooter>
						</Card>
						<Card className="h-fit max-h-full">
							<CardHeader>
								<CardTitle>{classroom?.name}</CardTitle>
								{/* <CardDescription>Card Description</CardDescription> */}
							</CardHeader>
							<CardContent>
								<Table>
									{/* <TableCaption>Notes</TableCaption> */}
									<TableHeader>
										<TableRow>
											<TableHead className="w-[100px]">Quizes</TableHead>
											<TableHead className="text-right">Date created</TableHead>
											<TableHead className="text-right">
												Last modified
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{classroom?.topics?.map((topic) =>
											topic?.quizzes?.map((quiz) => (
												<TableRow key={topic.id}>
													<TableCell className="font-medium">
														{quiz.name}
													</TableCell>
													<TableCell className="text-right">
														{String(quiz.createdAt).slice(0, 10)}
													</TableCell>
													<TableCell className="text-right">
														{String(quiz.updatedAt).slice(0, 10)}
													</TableCell>
												</TableRow>
											))
										)}
									</TableBody>
								</Table>
							</CardContent>
							<CardFooter>
								<div className="flex justify-between w-full">
									<p>Quizes</p>
									<DropdownMenu>
										<DropdownMenuTrigger>
											<Button>New</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuLabel>Pick Topic</DropdownMenuLabel>
											<DropdownMenuSeparator />
											{classroom?.topics?.map((topic) => (
												<Link to={topic.id} key={topic.id}>
													<DropdownMenuItem >{topic.name}</DropdownMenuItem>
												</Link>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</CardFooter>
						</Card>
					</div>
					<div className="self-end">
						<Popover
							open={delClassOpenPopover}
							onOpenChange={setDelClassOpenPopover}
						>
							<PopoverTrigger>
								<Button>Delete class</Button>
							</PopoverTrigger>
							<PopoverContent>
								<div className="flex justify-between">
									<Button onClick={() => setDelClassOpenPopover(false)}>
										Cancel
									</Button>
									<Button onClick={deleteClass}>Delete</Button>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			)}
		</>
	);
};

export default Classroom;
