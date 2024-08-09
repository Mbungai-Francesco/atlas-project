import { useState } from "react";
import StudListItem from "./studListItem";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface StudListItemProps {
	number: number;
	name: string;
	email: string;
	grade: string;
	attendance: number;
	performance: number;
}

function StudList() {
	const limit : number = 4
	const students: StudListItemProps[] = [
		{
			number: 1,
			name: "Alice Johnson",
			email: "alice.johnson@example.com",
			grade: "A",
			attendance: 95,
			performance: 90
		},
		{
			number: 2,
			name: "Bob Smith",
			email: "bob.smith@example.com",
			grade: "B",
			attendance: 88,
			performance: 85
		},
		{
			number: 3,
			name: "Charlie Brown",
			email: "charlie.brown@example.com",
			grade: "C",
			attendance: 80,
			performance: 75
		},
		{
			number: 4,
			name: "Diana Prince",
			email: "diana.prince@example.com",
			grade: "A",
			attendance: 98,
			performance: 100
		},
		{
			number: 5,
			name: "Ethan Hunt",
			email: "ethan.hunt@example.com",
			grade: "B",
			attendance: 85,
			performance: 80
		},
		{
			number: 6,
			name: "Fiona Gallagher",
			email: "fiona.gallagher@example.com",
			grade: "C",
			attendance: 78,
			performance: 70
		},
		{
			number: 7,
			name: "George Weasley",
			email: "george.weasley@example.com",
			grade: "A",
			attendance: 92,
			performance: 88
		},
		{
			number: 8,
			name: "Hannah Montana",
			email: "hannah.montana@example.com",
			grade: "B",
			attendance: 90,
			performance: 85
		},
		{
			number: 9,
			name: "Ivy Green",
			email: "ivy.green@example.com",
			grade: "A",
			attendance: 96,
			performance: 91
		},
		{
			number: 10,
			name: "Jack Sparrow",
			email: "jack.sparrow@example.com",
			grade: "B",
			attendance: 87,
			performance: 82
		},
		{
			number: 11,
			name: "Karen Black",
			email: "karen.black@example.com",
			grade: "C",
			attendance: 79,
			performance: 74
		},
		{
			number: 12,
			name: "Liam Neeson",
			email: "liam.neeson@example.com",
			grade: "A",
			attendance: 94,
			performance: 89
		},
		{
			number: 13,
			name: "Mia Wallace",
			email: "mia.wallace@example.com",
			grade: "B",
			attendance: 86,
			performance: 83
		}
	];
	const [studs, setStuds] = useState<StudListItemProps[]>(students.slice(0, limit));
	const [studNums, setStudNums] = useState<number>(students.length);
	const [start, setStart] = useState<number>(0);
	const [end, setEnd] = useState<number>(4);
	const front = () => {
		if(end < studNums){
			const left : number = start + limit
			const right : number = end + limit
			setStart(left);
			setEnd(right);
			setStuds(students.slice(left, right))
		}
	}
	const back =()=>{
		if(end > limit){
			end > studNums ? setEnd(end) : setEnd(end - limit)
			const left = start - limit
			const right = end - limit
			setStart(left);
			setEnd(right);
			setStuds(students.slice(left, right))
		}
	}

	return (
		<>
			<div className="w-full overflow-x-scroll">
				<table className="">
					<tr className=" text-left font-light text-gray-500 opacity-85 text-sm hover:bg-gray-100">
						{/* <th className="font-medium pr-4 py-4">Num</th> */}
						<th className="font-medium pr-4 py-4">Name</th>
						<th className="font-medium pr-4 py-4">Grade</th>
						<th className="font-medium pr-4 py-4">Attendance</th>
						<th className="font-medium pr-4 py-4">Performance</th>
					</tr>
					{studs.map((student) => {
						return (
							<tr className="border-t text-sm hover:bg-gray-100" key={student.number}>
								<StudListItem
									number={student.number}
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
			<div className="flex text-sm justify-between">
				<p>
					Showing
					<span className="font-semibold"> 1-10</span>
					<br /> of
					<span className="font-semibold"> {studNums}</span> students
				</p>
				<div>
					<button onClick={back} className="border rounded-md"><ChevronLeft/></button>
					<button onClick={front}  className="border rounded-md ml-2"><ChevronRight/></button>
				</div>
			</div>
		</>
	);
}

export default StudList;
