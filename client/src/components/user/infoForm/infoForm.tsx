"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDependencyContext } from "@/hooks/useDependencyContext";
import { ClassRoom } from "@/types";
import { getUser, updateUser } from "@/api";

const formSchema = z.object({
	age: z.string(),
	classrooms: z
		.array(z.string())
		.refine((value) => value.some((classroom) => classroom), {
			message: "You have to select at least one classroom.",
		}),
});

// Main Inform function
const InfoForm = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<ClassRoom[]>();
	const { userId } = useParams<{ userId: string }>();
	const { user } = useUser();
	const { state, dispatch } = useDependencyContext();
	const { users } = state;

	useEffect(() => {
		if (user) {
			getClassrooms();
		}
	}, [user]);

	// update user

	// get classrooms
	const getClassrooms = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/classrooms");
			setData(response.data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	// define the form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			classrooms: [],
		},
	});

	// submit function
	function onSubmit(data: z.infer<typeof formSchema>) {
		// console.table(data);
		const newData = Number(data.age);
		if (userId)
			getUser(userId).then((res) => {
				if (res) {
					console.log(res);
					res.age = newData;
					res.classroomId = data.classrooms
					updateUser(userId, res).then((inres) => {
						console.log(inres);
						if (inres) {
							dispatch({ type: "SET_USER", payload: inres });
							navigate("/myClassrooms");
						} else return null;
					});
				}
			});
		console.log(users);

		// if (userId)
		// 	updateUser(userId, newData).then((res) => {
		// 		if (res) {
		// 			dispatch({ type: "SET_USER", payload: res });
		// 			navigate("/myClassrooms");
		// 		} else return null;
		// 	});
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="age"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Age</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Enter your age"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									This is your public display age.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="classrooms"
						render={() => (
							<FormItem>
								<div className="mb-4">
									<FormLabel className="text-base">Sidebar</FormLabel>
									<FormDescription>
										Select the items you want to display in the sidebar.
									</FormDescription>
								</div>
								{data?.map((item) => (
									<FormField
										key={item.id}
										control={form.control}
										name="classrooms"
										render={({ field }) => {
											return (
												<FormItem
													key={item.id}
													className="flex flex-row items-start space-x-3 space-y-0"
												>
													<FormControl>
														<Checkbox
															checked={field.value?.includes(item.id)}
															onCheckedChange={(checked) => {
																return checked
																	? field.onChange([...field.value, item.id])
																	: field.onChange(
																			field.value?.filter(
																				(value) => value !== item.id
																			)
																	  );
															}}
														/>
													</FormControl>
													<FormLabel className="text-sm font-normal">
														{item.name}
													</FormLabel>
												</FormItem>
											);
										}}
									/>
								))}
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</>
	);
};

export default InfoForm;
