import Description from "@/components/shared/description";
import StudList from "@/components/studProgress/studList";
import StudProfile from "@/components/studProgress/studProfile";
import Card from "@/components/ui/card";
// import { User } from "@/types";
// import { useState } from "react";

const Student = () => {
	// const [ stud, setStud ] = useState<User[] | null>(null);

	return (
		<>
			<div className="grid grid-cols-3 gap-x-4">
				<Card>
					<Description
						title="Student List"
						description="View and manage your students' progress and performance."
					></Description>
          <StudList
						
					></StudList>
				</Card>
				<Card>
					<Description
						title="Student Profile"
						description="Detailed view of a student's academic progress and performance."
					></Description>
					<StudProfile></StudProfile>
				</Card>
			</div>
		</>
	);
};

export default Student;
