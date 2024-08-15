import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CreateClassroom = () => {
	return (
		<>
			<p>Create classroom</p>
			<Link to={"/classrooms"}>
				<Button>Cancel</Button>
			</Link>
		</>
	);
};

export default CreateClassroom;
