import { Route, Routes } from "react-router-dom";

import { About, Stud, Student, SignInPage, SignUpPage, Welcome } from "@/pages";
import Sidebar from "@/components/shared/navigation/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/shared/navigation/navbar";
import { AuthLayout } from "@/pages/layout";
import { useAuth } from "@clerk/clerk-react";
import { cn } from "./lib/utils";
import CreateUser from "./components/createUser";
import InfoForm from "./components/infoForm/infoForm";

const App = () => {
  const { userId } = useAuth();

  return (
    <ThemeProvider>
      <div className={cn(userId && "flex box-border max-w-7xl mx-auto")}>
        {userId && <Sidebar />}
        <div className={cn(userId && "w-full sm:pl-14 ")}>
          {userId && <Navbar />}
          <div className={cn(userId && "relative calc-height p-6 w-full")}>
            <Routes>
              <Route path="/" index element={<SignInPage />} />
              <Route path="/student" element={<Student />} />
              <Route path="/about" element={<About />} />
              <Route path="/createUser" element={<CreateUser />} />
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
