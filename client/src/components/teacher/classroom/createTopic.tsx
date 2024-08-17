"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDependencyContext } from "@/hooks/useDependencyContext";
import { createTopic, updateClassroom } from "@/api";
import { useClerk } from "@clerk/clerk-react";
import { ClassRoom } from "@/types";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "topic name must be at least 2 characters.",
	}),
});

interface topicProps {
	setOpenPopover: (value: boolean) => void;
	classroom: ClassRoom;
}

const CreateTopic = ({ setOpenPopover, classroom }: topicProps) => {
	const { user } = useClerk();
	const id = localStorage.getItem("teacherId") || "";
	const { classState, classDispatch } = useDependencyContext();
	const { classes } = classState;
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.s
		// ✅ This will be type-safe and validated.
		console.log(values);
		if (user) {
			createTopic(user.id, {
				name: values.name,
				classRoomId: classroom.id,
			}).then((res) => {
				if (res) {
					console.log("id", id);
					classroom.topics?.push(res);
					updateClassroom(user.id, classroom, id).then((inres) => {
						if (inres) {
							classDispatch({ type: "UPDATE_CLASS", payload: inres });
							console.log(classes);
							setOpenPopover(false);
						} else {
							return null;
						}
					});
				} else {
					return null;
				}
			});
		}
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Topic name</FormLabel>
								<FormControl>
									<Input placeholder="Topic name" {...field} />
								</FormControl>
								{/* <FormDescription>
									This is your public display name.
								</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-between">
						<Button onClick={() => setOpenPopover(false)}>Cancel</Button>
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default CreateTopic;
