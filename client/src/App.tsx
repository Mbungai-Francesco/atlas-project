import { About, Home } from "@/pages";
import Navbar from "./components/shared/navbar";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <div className="py-20 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/about" index element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
