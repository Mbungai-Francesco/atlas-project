"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

import { Button } from "@/components/ui/button";
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
import NewOption from "./newOption";
import { Quiz } from "@/types";
import { useRef, useState } from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getQuizzes } from "@/api";

const formSchema = z.object({
	question: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	answer: z
		.array(z.string())
		.refine((value) => value.some((classroom) => classroom), {
			message: "You have to select at least one classroom.",
		}),
});

interface questionProps {
	num: number;
	qQuiz: Quiz | undefined;
	updatedQuiz: (quiz: Quiz) => void;
}

const NewQuestion = ({ num, qQuiz, updatedQuiz }: questionProps) => {
	let emoptyQuiz: Quiz;
	const inputRef = useRef<HTMLInputElement>(null);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			question: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	const inputHandler = () => {
		const val: string = inputRef.current?.value || "";
		console.log(val);
		console.log(qQuiz);
		emoptyQuiz.questions[num].question = val;
		console.log(emoptyQuiz);
		
		if (qQuiz) {
			console.log(qQuiz);
			qQuiz.questions[num].question = val;
			updatedQuiz(qQuiz);
		}
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex">
					<div className="w-full">
						<div className="flex justify-between">
							<div className="w-4/5">
								<FormField
									control={form.control}
									name="question"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder="question text"
													{...field}
													ref={inputRef}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button className="m-0" type="button" onClick={inputHandler}>Submit</Button>
						</div>

						<div className="flex space-x-2 items-center">
							<NewOption />
							<Button type="submit" className="m-0">
								Submit
							</Button>
						</div>
						<FormField
							control={form.control}
							name="answer"
							render={() => (
								<FormItem>
									<Select>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select an answer" />
										</SelectTrigger>
										<SelectContent>
											{qQuiz?.questions[num].options.map((item) => (
												<FormField
													key={item}
													control={form.control}
													name="answer"
													render={({ field }) => {
														return (
															<FormItem
																key={item}
																className="flex flex-row items-start space-x-3 space-y-0"
															>
																<FormControl>
																	<SelectItem
																		value="dark"
																		onClick={() =>
																			field.onChange([...field.value, item])
																		}
																	>
																		{item}
																	</SelectItem>
																</FormControl>
															</FormItem>
														);
													}}
												/>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
		</>
	);
};

export default NewQuestion;
