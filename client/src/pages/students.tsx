import Description from "@/components/shared/description";
import StudList from "@/components/studProgress/studList";
import Card from "@/components/ui/card";

interface StudentProps {
	sub: (val: string) => void;
}

const Student = ({ sub }: StudentProps) => {
	sub("Student Progress");
	return (
		<>
			<div className="grid grid-cols-3">
				<Card>
					<Description
						title="Student List"
						description="View and manage your students' progress and performance."
					></Description>
          <StudList></StudList>
				</Card>
			</div>
		</>
	);
};

export default Student;
