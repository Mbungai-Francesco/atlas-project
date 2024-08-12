import { Route, Routes } from "react-router-dom";

import { About, Stud, Student, Welcome } from "@/pages";
import Sidebar from "@/components/shared/navigation/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/shared/navigation/navbar";

const App = () => {
  return (
    <ThemeProvider>
      <div className="flex box-border font-roboto max-w-7xl mx-auto">
        {/* <Sidebar /> */}
        <div className="w-full sm:pl-14 ">
          <Navbar />
          <div className="relative calc-height p-6 w-full">
            <Routes>
              <Route path="/" index element={<Welcome />} />
              <Route path="/about" index element={<About />} />
              <Route path="/student" element={<Stud />} />
            </Routes>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
