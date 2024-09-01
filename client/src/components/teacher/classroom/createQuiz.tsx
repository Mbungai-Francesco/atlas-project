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
import { useEffect, useState } from "react";
import { Quiz } from "@/types";
import Question from "./question";
import { newQuiz } from "@/api";

const titleShema = z.object({
	title: z.string().min(2, {
		message: "Quiz name must be at least 2 characters.",
	}),
});

const questSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

const CreateQuiz = () => {
	const [questionNum, setQuestionNum] = useState(0);
	const [quiz, setQuiz] = useState<Quiz>({});
	const [title, setTitle] = useState<string | null>(null);

	useEffect(() => {
		if (!quiz) {
			console.log(!quiz);
		}
	}, []);

	useEffect(() => {
		console.log(quiz);
	}, [quiz]);

	// newQuiz(clerkId, title, question, topicId)
	// 1. Define your form.
	const form = useForm<z.infer<typeof titleShema>>({
		resolver: zodResolver(titleShema),
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
		setTitle(values.title);
		setQuiz((res) => {
			res["title"] = values.title;
			return res;
		});
	}

	const updateQuiz = (val: Quiz) => {
		console.log(val);	
		setQuiz(val);
	};
	// const createQuiz = () => {
	// 	const val = titleRef.current?.value || "";
	// 	if (val) {
	// 		console.log(val);
	// 	}
	//   newQuiz()
	// };

	return (
		<>
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
											className="w-full"
										/>
									</FormControl>
									<Button type="submit">Submit</Button>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<div>
				<p className="mb-4">Quiz</p>
				<div>
					{quiz?.questions?.map((quest) => (
						<Question question={quest} />
					))}
				</div>
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
										updatedQuiz={updateQuiz}
										title={title}
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
