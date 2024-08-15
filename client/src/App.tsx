import { Route, Routes } from "react-router-dom";

import { About, Stud, Student, SignInPage, SignUpPage, Welcome } from "@/pages";
import Sidebar from "@/components/shared/navigation/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/shared/navigation/navbar";
import { AuthLayout } from "@/pages/layout";
import { useAuth } from "@clerk/clerk-react";
import { cn } from "./lib/utils";
import CreateUser from "./components/user/createUser";
import InfoForm from "./components/user/infoForm/infoForm";
import StudentClassrooms from "./components/user/studClassrooms";
import ClassRoom from "./components/teacher/classroom/classrooms";
import CreateClassroom from "./components/teacher/classroom/createClassroom";

const App = () => {
	const { userId } = useAuth();

	return (
		<ThemeProvider>
			<div className={cn(userId && "flex box-border max-w-7xl mx-auto")}>
				{userId && <Sidebar />}
				{/* <Sidebar /> */}
				{/* <div className={cn("w-full sm:pl-14 ")}> */}
				<div className={cn(userId && "w-full sm:pl-14 ")}>
					{userId && <Navbar />}
					{/* <Navbar /> */}
					<div className={cn(userId && "relative calc-height p-6 w-full")}>
						{/* <div className={"relative calc-height p-6 w-full"}> */}
						<Routes>
							<Route path="/" index element={<SignInPage />} />
							<Route path="/myStudents" element={<Student />} />
							<Route path="/classrooms" element={<ClassRoom />} />
							<Route path="/myClassrooms" element={<StudentClassrooms />} />
							<Route path="/about" element={<About />} />
							<Route path="/createUser" element={<CreateUser />} />
							<Route path="/createClassroom" element={<CreateClassroom />} />
							<Route path="/infoForm/:userId" element={<InfoForm />} />
							<Route path="/stud" element={<Stud />} />
							<Route path="/auth" element={<AuthLayout />}>
								<Route index path="sign-in" element={<SignInPage />} />
								<Route path="sign-up" element={<SignUpPage />} />
							</Route>
						</Routes>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default App;
