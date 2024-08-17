import { useDependencyContext } from "@/hooks/useDependencyContext";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
	const { user } = useUser();
	const navigate = useNavigate();

	const { dispatch } = useDependencyContext();

	useEffect(() => {
		// Define the asynchronous function to create a user
		const createUser = async () => {
			// Send a POST request to create a user
			const response = await axios.post("http://localhost:5000/api/users", {
				username: user?.username,
				email: user?.emailAddresses[0].emailAddress,
				clerkId: user?.id,
				firstname: user?.firstName,
				secondname: user?.lastName,
			});
			// Check if the response status is 200 or 201
			if (response.status === 200 || response.status === 201) {
				console.log(response.status);
				console.log(response.data);
				// Store the user ID in localStorage
				localStorage.setItem("userId", JSON.stringify(response.data.data.id));
				// Dispatch an action to set the user in the context
				dispatch({ type: "SET_USER", payload: response.data.data });
				// Navigate to the info form with the user ID
				navigate(`/infoForm/${response.data.data.id}`);
			} else {
				console.log("Failed to create user");
				user?.delete();
			}
		};
		// Check if the user exists

		if (user) {
			createUser();
		} else {
			console.log("No user found");
		}
	}, [user]);

	return <></>;
};

export default CreateUser;
