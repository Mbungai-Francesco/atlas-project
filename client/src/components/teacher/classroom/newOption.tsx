"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Button } from "@/components/ui/button";

const optionSchema = z.object({
	option: z.string().min(2, {
		message: "Option must be at least 2 characters.",
	}),
});

interface NewOptionProps {
	updatedOptions: (option: string) => void;
}

const NewOption = ({updatedOptions}: NewOptionProps) => {
	// 1. Define your form.
	const optionForm = useForm<z.infer<typeof optionSchema>>({
		resolver: zodResolver(optionSchema),
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof optionSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	const addOption = () => {
		const option = optionForm.getValues("option");
		if(option) {
			updatedOptions(option);
			optionForm.resetField('option');
		}
	}

	return (
		<>
			<Form {...optionForm}>
				<form onSubmit={optionForm.handleSubmit(onSubmit)}>
					<FormField
						control={optionForm.control}
						name="option"
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
									<Button type="button" onClick={addOption}>Submit</Button>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</>
	);
};

export default NewOption;
