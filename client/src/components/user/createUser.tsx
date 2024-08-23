import { newUser } from "@/api";
import { useDependencyContext } from "@/hooks/useDependencyContext";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
	const { user } = useUser();
	const navigate = useNavigate();

	const { dispatch } = useDependencyContext();

	useEffect(() => {
		// Check if the user exists

		if (user && user.username) {
			const data = {
				username: user.username,
				email: user.emailAddresses[0].emailAddress,
				clerkId: user.id,
			};
			newUser(data).then((res) => {
				if (res) {
					console.log(res);
					localStorage.setItem("userId", JSON.stringify(res.id));
					dispatch({ type: "SET_USER", payload: res });
					navigate(`/infoForm/${res.id}`);
				} else {
					console.log("Failed to create user");
					user?.delete();
				}
			});
		} else {
			console.log("No user found");
		}
	}, [user]);

	return <></>;
};

export default CreateUser;
