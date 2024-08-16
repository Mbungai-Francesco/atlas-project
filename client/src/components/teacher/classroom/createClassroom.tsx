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

const CreateClassroom = ( { setOpenPopover, clerkID, profID }: classroomProps) => {
	const { classDispatch } = useDependencyContext()
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
		createClass(values.name)
	}

	const createClass = async (className : string) => {
		// const authorizationHeader = `Bearer user_2kZLrxldPINZN0bFzL9j11WOPyr`;
		const authorizationHeader = `Bearer ${clerkID}`;
		console.log("Authorization Header:", authorizationHeader); // Log the authorization header
		const response = await fetch("http://localhost:5000/api/classrooms", {
			method: "POST",
			headers : {
				"Content-Type": "application/json",
				"authorization": authorizationHeader,
			},
			body : JSON.stringify({
				name: className,
				teacherId: profID
			})
		});
		if(response.status === 200){
			const json = await response.json()
			console.log("Classroom created successfully", json.data);
			classDispatch({type: 'ADD_CLASS', payload: json.data});
			setOpenPopover(false);
		}
		if(response.status === 400){
			console.log("error", response.statusText);
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
						<Button
						onClick={() => setOpenPopover(false)}
						>Cancel</Button>
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default CreateClassroom;
