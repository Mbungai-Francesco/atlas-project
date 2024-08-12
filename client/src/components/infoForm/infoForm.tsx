import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

const InfoForm = () => {
	const [classes, setClasses] = useState<string[]>([]);

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setClasses(
        (prev) => [...prev, event.target.value]
      );
    } else {
      setClasses(classes.filter((c) => c !== event.target.value));
    }	
	};

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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
    console.log(classes);
    
		console.log("submitted");
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					<Input type="number" placeholder="Your age" />
				</label>
				<p>Pick your class(es)</p>
				<div className="items-top flex flex-col max-h-40 overflow-y-scroll">
					{data.map((classroom) => (
						<>
							<label key={classroom.id} className="flex items-center">
								<input
									type="checkbox"
									value={classroom.id}
									checked={classes.includes(classroom.id)}
									onChange={handleCheckboxChange}
								/>
								<p>{classroom.name}</p>
							</label>
						</>
					))}
				</div>
				<Button>Submit</Button>
			</form>
		</>
	);
};

export default InfoForm;
