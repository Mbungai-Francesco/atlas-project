interface StudListItemProps {
	number: number;
	name: string;
	email: string;
	grade: string;
	attendance: number;
	performance: number;
}

function StudListItem(stud: StudListItemProps) {
  const performance : string = `${stud.performance/100 * 3}rem`;
  
	return (
		<>
			<td>
				<p>{stud.number}</p>
			</td>
			<td className="p-4">
				<p className="font-medium">{stud.name}</p>
				<p className="text-gray-400">{stud.email}</p>
			</td>
			<td className="py-4">{stud.grade}</td>
			<td className="py-4">
				<p className="border w-fit py-0 px-3 rounded-full text-[0.86em]  font-semibold">
					{stud.attendance}%
				</p>
			</td>
			<td className="py-4">
				<div className="flex items-center">
					<div className="w-12 rounded-full h-[1em] bg-gray-300 mr-3">
            <div className="h-inherit bg-black rounded-full"
            style={{width: performance}}></div>
          </div>
					<p>{stud.performance}%</p>
				</div>
			</td>
		</>
	);
}

export default StudListItem;