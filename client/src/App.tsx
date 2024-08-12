import { Route, Routes } from "react-router-dom";

import { About, Stud, Student, SignInPage, SignUpPage } from "@/pages";
import Sidebar from "@/components/shared/navigation/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/shared/navigation/navbar";
import { AuthLayout } from "@/pages/layout";
import { useAuth } from "@clerk/clerk-react";
import { cn } from "./lib/utils";

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
              <Route path="/" index element={<Student />} />
              <Route path="/about" index element={<About />} />
              <Route path="/student" element={<Stud />} />
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
