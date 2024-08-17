import { useDependencyContext } from "@/hooks/useDependencyContext";
import { ClassRoom } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const Classroom = () => {
	const { user } = useClerk()
	const teachId = localStorage.getItem("teacherId");
	const { classID } = useParams<{ classID: string }>();
	const [classroom, setClassroom] = useState<ClassRoom>();
	const { classState, classDispatch } = useDependencyContext();
	const { classes } = classState;
	const [openPopover, setOpenPopover] = useState(false);
	const [openPopover2, setOpenPopover2] = useState(false);
	const navigate = useNavigate()

	const deleteClass = () =>{
		if(user && classID){
			deleteClassroom(user.id,classID).then((res) =>{
				if(res){
					console.log('res', res);
					classDispatch({type: 'DELETE_CLASS', payload: res})
					if(teachId){
						getTeacher(teachId).then((res) =>{
							if(res){
								res.classroomId = res.classroomId.filter(item => item !== classID)
								updateTeacher(user.id,res)
							}
						})
					}
					navigate('/classrooms')
				}
			})
		}
		
	}

	useEffect(() => {
		console.log("classID", classID);
		for (const item of classes) {
			if (item.id === classID) {
				const { ...room} = item
				setClassroom(room);
			}
		}
	}, [classes]);

	return (
		<>
			{classroom && (
				<div className="flex flex-col space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
						<Card>
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
									<TableBody>
										{classroom?.topics?.map((topic) => (
											<TableRow key={topic.id}>
												<TableCell className="font-medium">
													{topic.name}
												</TableCell>
												<TableCell className="text-right">
													{String(topic.createdAt)}
												</TableCell>
												<TableCell className="text-right">
													{String(topic.updatedAt)}
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
						<Card>
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
											topic.quizzes.map((quiz) => (
												<TableRow key={topic.id}>
													<TableCell className="font-medium">
														{quiz.name}
													</TableCell>
													<TableCell className="text-right">
														{String(quiz.createdAt)}
													</TableCell>
													<TableCell className="text-right">
														{String(quiz.updatedAt)}
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
									<Popover>
										<PopoverTrigger>
											<Button>New quiz</Button>
										</PopoverTrigger>
										<PopoverContent>
											Place content for the popover here.
										</PopoverContent>
									</Popover>
								</div>
							</CardFooter>
						</Card>
					</div>
					<div className="self-end">
						<Popover open={openPopover2} onOpenChange={setOpenPopover2}>
							<PopoverTrigger>
								<Button>Delete class</Button>
							</PopoverTrigger>
							<PopoverContent>
								<div className="flex justify-between">
									<Button onClick={() => setOpenPopover2(false)}>Cancel</Button>
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
