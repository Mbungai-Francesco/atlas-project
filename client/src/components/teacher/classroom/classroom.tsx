import { useDependencyContext } from "@/hooks/useDependencyContext";
import { ClassRoom } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	Table,
	TableBody,
	TableCaption,
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

const Classroom = () => {
	const { classID } = useParams<{ classID: string }>();
	const [classroom, setClassroom] = useState<ClassRoom>();
	const { classState, classDispatch } = useDependencyContext();
	const { classes } = classState;

	useEffect(() => {
		console.log("classID", classID);
		for (const item of classes) {
			if (item.id === classID) {
				setClassroom(item);
			}
		}
	}, [classes]);

	return (
		<>
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
								<TableHead className="text-right">Last modified</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{classroom?.topics?.map((topic) => (
								<TableRow key={topic.id}>
									<TableCell className="font-medium">{topic.name}</TableCell>
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
						<Popover>
							<PopoverTrigger>
								<Button>New topic</Button>
							</PopoverTrigger>
							<PopoverContent>
								Place content for the popover here.
							</PopoverContent>
						</Popover>
					</div>
				</CardFooter>
			</Card>
		</>
	);
};

export default Classroom;
