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
import { createClassroom, getTeacher, updateTeacher } from "@/api";
import { Topic } from "@/types";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "class name must be at least 2 characters.",
	}),
});

interface classroomProps {
	setOpenPopover: (value: boolean) => void;
	clerkID: string | undefined;
	profID: string | null;
}

const CreateClassroom = ({
	setOpenPopover,
	clerkID,
	profID,
}: classroomProps) => {
	const { classDispatch } = useDependencyContext();
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
		createClass(values.name);
	}

	const createClass = async (className: string) => {
		// const authorizationHeader = `Bearer user_2kZLrxldPINZN0bFzL9j11WOPyr`;
		const emptyTopic : Topic[] = []
		if (clerkID && profID)
			createClassroom(clerkID, { name: className, teacherId: profID, topic: emptyTopic }).then(
				(res) => {
					if (res) {
						classDispatch({ type: "ADD_CLASS", payload: res });
						getTeacher(profID).then((inres) => {
							if (inres) {
								inres.classroomId.push(res.id);
								updateTeacher(inres).then((upres) => {
									if (upres) console.log("Teacher updated");
								});
							}
						});
						setOpenPopover(false);
					}
				}
			);
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Class name</FormLabel>
								<FormControl>
									<Input placeholder="Classroom name" {...field} />
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

export default CreateClassroom;
