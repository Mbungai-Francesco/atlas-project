"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import NewQuestion from "./newQuestion";
import { useEffect, useRef, useState } from "react";
import { Quiz } from "@/types";
import Question from "./question";
import { newQuiz } from "@/api";

const titleShema = z.object({
	title: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

const questSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

const CreateQuiz = () => {
	let emptyQuiz: Quiz;
	const [questionNum, setQuestionNum] = useState(0);
	const [quiz, setQuiz] = useState<Quiz>();
	const titleRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!quiz) {
			console.log(!quiz);
			console.log(emptyQuiz);
			setQuiz(emptyQuiz);
		}
	}, []);

	useEffect(() => {
		console.log(quiz);
	}, [quiz]);

	// newQuiz(clerkId, title, question, topicId)
	// 1. Define your form.
	const form = useForm<z.infer<typeof titleShema>>({
		resolver: zodResolver(questSchema),
		defaultValues: {
			title: "",
		},
	});

	const quest = useForm<z.infer<typeof questSchema>>({
		resolver: zodResolver(questSchema),
		defaultValues: {
			username: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof questSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	function onTitleSubmit(values: z.infer<typeof titleShema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	const createQuiz = () => {
		const val = titleRef.current?.value || "";
		if (val) {
			console.log(val);
		}
    newQuiz()
	};

	return (
		<>
			<div>
				<p className="mb-4">Quiz</p>
				<div>
					{quiz?.questions?.map((quest) => (
						<Question question={quest} />
					))}
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onTitleSubmit)}>
						<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<div className="flex space-x-4 ">
											<FormControl className="w-4/5">
												<Input
													placeholder="Quiz title"
													{...field}
													ref={titleRef}
                          className="w-full"
												/>
											</FormControl>
											<Button type="button" onClick={createQuiz}>Next</Button>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
					</form>
				</Form>
				<Form {...quest}>
					<form onSubmit={quest.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={quest.control}
							name="username"
							render={() => (
								<FormItem>
									<FormLabel>Question</FormLabel>
									<NewQuestion
										num={questionNum}
										qQuiz={quiz}
										updatedQuiz={setQuiz}
									/>
								</FormItem>
							)}
						/>
						<Button hidden={true} type="submit">
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
};

export default CreateQuiz;
