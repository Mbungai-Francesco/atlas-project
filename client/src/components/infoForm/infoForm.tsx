"use client"

import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUser } from '@clerk/clerk-react';

const formSchema = z.object({
  age: z.string(),
	classrooms: z.array(z.string()).refine((value) => value.some((classroom) => classroom), {
    message: "You have to select at least one classroom.",
  }),
})

// Main Inform function
const InfoForm = () => {
	const { user } = useUser()

	// update user
	const updateUser = async (data : {age: number, classroomId: string[]}) => {
		try {
			console.log(user?.id);
      const response = await axios.put(`http://localhost:5000/api/users/${user?.id}`, data);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
	}

	// define the form
	const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classrooms: [],
    },
  })

	// submit function
	function onSubmit(data: z.infer<typeof formSchema>) {
		console.table(data);
		const newData = {age: Number(data.age), classroomId: data.classrooms}
		updateUser(newData)
  }

	// sample data
	const data = [
		{
			id: "classroom001",
			name: "Math",
			studentIds: ["user004", "user006"],
			students: [
				{
					id: "user004",
					username: "ajones",
					firstname: "Alice",
					secondname: "Jones",
					classroomId: ["classroom001", "classroom002"],
					age: 17,
					email: "alice.jones@student.edu",
					usertype: "STUDENT",
					clerkId: "clerk004",
					createdAt: "2024-08-09T09:45:00Z",
					updatedAt: "2024-08-09T09:45:00Z",
				},
				{
					id: "user006",
					username: "dgreen",
					firstname: "Diana",
					secondname: "Green",
					classroomId: ["classroom001", "classroom003"],
					email: "diana.green@student.edu",
					usertype: "STUDENT",
					clerkId: "clerk006",
					createdAt: "2024-08-09T10:15:00Z",
					updatedAt: "2024-08-09T10:15:00Z",
				},
			],
			teacherId: ["teacher001"],
			teachers: [
				{
					id: "teacher001",
					email: "john.doe@atlas.edu",
					username: "jdoe",
					firstname: "John",
					secondname: "Doe",
					clerkId: "clerk001",
					teachingsubject: "Mathematics",
					classroomId: ["classroom001"],
					createdAt: "2024-08-09T08:00:00Z",
					updatedAt: "2024-08-09T08:00:00Z",
				},
			],
			topics: [
				{
					id: "topic001",
					name: "Calculus",
					classRoomId: "classroom001",
					createdAt: "2024-08-09T09:00:00Z",
					updatedAt: "2024-08-09T09:00:00Z",
				},
				{
					id: "topic004",
					name: "Linear Algebra",
					classRoomId: "classroom002",
					createdAt: "2024-08-09T09:45:00Z",
					updatedAt: "2024-08-09T09:45:00Z",
				},
			],
			createdAt: "2024-08-09T09:45:00Z",
			updatedAt: "2024-08-09T09:45:00Z",
		},
		{
			id: "classroom002",
			name: "Chem",
			studentIds: ["user004", "user005"],
			students: [
				{
					id: "user004",
					username: "ajones",
					firstname: "Alice",
					secondname: "Jones",
					classroomId: ["classroom001", "classroom002"],
					age: 17,
					email: "alice.jones@student.edu",
					usertype: "STUDENT",
					clerkId: "clerk004",
					createdAt: "2024-08-09T09:45:00Z",
					updatedAt: "2024-08-09T09:45:00Z",
				},
				{
					id: "user005",
					username: "bwhite",
					firstname: "Bob",
					secondname: "White",
					classroomId: ["classroom002", "classroom003"],
					age: 16,
					email: "bob.white@student.edu",
					usertype: "STUDENT",
					clerkId: "clerk005",
					createdAt: "2024-08-09T10:00:00Z",
					updatedAt: "2024-08-09T10:00:00Z",
				},
			],
			teacherId: ["teacher002"],
			teachers: [
				{
					id: "teacher002",
					email: "jane.smith@atlas.edu",
					username: "jsmith",
					firstname: "Jane",
					secondname: "Smith",
					clerkId: "clerk002",
					teachingsubject: "Chemistry",
					classroomId: ["classroom002"],
					createdAt: "2024-08-09T08:15:00Z",
					updatedAt: "2024-08-09T08:15:00Z",
				},
			],
			topics: [
				{
					id: "topic002",
					name: "Organic Chemistry",
					classRoomId: "classroom003",
					createdAt: "2024-08-09T09:15:00Z",
					updatedAt: "2024-08-09T09:15:00Z",
				},
				{
					id: "topic005",
					name: "Inorganic Chemistry",
					classRoomId: "classroom004",
					createdAt: "2024-08-09T10:00:00Z",
					updatedAt: "2024-08-09T10:00:00Z",
				},
			],
			createdAt: "2024-08-09T10:00:00Z",
			updatedAt: "2024-08-09T10:00:00Z",
		},
		{
			id: "classroom003",
			name: "Physics",
			studentIds: ["user006", "user005"],
			students: [
				{
					id: "user006",
					username: "dgreen",
					firstname: "Diana",
					secondname: "Green",
					classroomId: ["classroom001", "classroom003"],
					email: "diana.green@student.edu",
					usertype: "STUDENT",
					clerkId: "clerk006",
					createdAt: "2024-08-09T10:15:00Z",
					updatedAt: "2024-08-09T10:15:00Z",
				},
				{
					id: "user005",
					username: "bwhite",
					firstname: "Bob",
					secondname: "White",
					classroomId: ["classroom002", "classroom003"],
					age: 16,
					email: "bob.white@student.edu",
					usertype: "STUDENT",
					clerkId: "clerk005",
					createdAt: "2024-08-09T10:00:00Z",
					updatedAt: "2024-08-09T10:00:00Z",
				},
			],
			teacherId: ["teacher002"],
			teachers: [
				{
					id: "teacher002",
					email: "jane.smith@atlas.edu",
					username: "jsmith",
					firstname: "Jane",
					secondname: "Smith",
					clerkId: "clerk002",
					teachingsubject: "Chemistry",
					classroomId: ["classroom002"],
					createdAt: "2024-08-09T08:15:00Z",
					updatedAt: "2024-08-09T08:15:00Z",
				},
			],
			topics: [
				{
					id: "topic002",
					name: "Organic Chemistry",
					classRoomId: "classroom003",
					createdAt: "2024-08-09T09:15:00Z",
					updatedAt: "2024-08-09T09:15:00Z",
				},
				{
					id: "topic005",
					name: "Inorganic Chemistry",
					classRoomId: "classroom004",
					createdAt: "2024-08-09T10:00:00Z",
					updatedAt: "2024-08-09T10:00:00Z",
				},
			],
			createdAt: "2024-08-09T10:00:00Z",
			updatedAt: "2024-08-09T10:00:00Z",
		},
	];

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
                <Input type="number" placeholder="Enter your age" {...field} />
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
              {data.map((item) => (
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
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    )
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

export default InfoForm