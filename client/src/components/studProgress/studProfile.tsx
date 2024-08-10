import { UserRound } from "lucide-react";

function StudProfile() {
	return (
		<>
			<div className="flex items-center">
				{/* <img src="" alt="" /> */}
				<div className="p-2">
					<UserRound color="gray"></UserRound>
				</div>
				<div>
					<p className="font-semibold">Emma Johnson</p> {/* student name*/}
					<p className="text-sm">Grade 10</p> {/* student grade*/}
				</div>
			</div>
			<div>
				<p>Assessments</p>
				
			</div>
		</>
	);
}

export default StudProfile;
