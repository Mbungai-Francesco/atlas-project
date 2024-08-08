import StudListItem from "./studListItem";

interface StudListProps {
	name: string;
	email: string;
	grade: string;
	attendance: number;
	performance: number;
}

function StudList() {
	const students: StudListProps[] = [
		{
			name: "Alice Johnson",
			email: "alice.johnson@example.com",
			grade: "A",
			attendance: 95,
			performance: 90,
		},
		{
			name: "Bob Smith",
			email: "bob.smith@example.com",
			grade: "B",
			attendance: 88,
			performance: 85,
		},
		{
			name: "Charlie Brown",
			email: "charlie.brown@example.com",
			grade: "C",
			attendance: 80,
			performance: 75,
		},
		{
			name: "Diana Prince",
			email: "diana.prince@example.com",
			grade: "A",
			attendance: 98,
			performance: 92,
		},
		{
			name: "Ethan Hunt",
			email: "ethan.hunt@example.com",
			grade: "B",
			attendance: 85,
			performance: 80,
		},
		{
			name: "Fiona Gallagher",
			email: "fiona.gallagher@example.com",
			grade: "C",
			attendance: 78,
			performance: 70,
		},
		{
			name: "George Weasley",
			email: "george.weasley@example.com",
			grade: "A",
			attendance: 92,
			performance: 88,
		},
		{
			name: "Hannah Montana",
			email: "hannah.montana@example.com",
			grade: "B",
			attendance: 90,
			performance: 85,
		},
	];
	return (
		<>
			<div className="w-full overflow-x-scroll">
				<table className="">
					<tr className=" text-left font-light text-gray-500 opacity-85 text-sm ">
						<th className="font-medium pr-4 py-4">Name</th>
						<th className="font-medium pr-4 py-4">Grade</th>
						<th className="font-medium pr-4 py-4">Attendance</th>
						<th className="font-medium pr-4 py-4">Performance</th>
					</tr>
					{students.map((student) => {
						return (
							<tr className="border-t text-sm">
								<StudListItem
									name={student.name}
									email={student.email}
									grade={student.grade}
									attendance={student.attendance}
									performance={student.performance}
								></StudListItem>
							</tr>
						);
					})}
				</table>
			</div>
		</>
	);
}

export default StudList;
