import { About, Student, Welcome } from "@/pages";
import Navbar from "./components/shared/navbar";
import SearchBar from "./components/ui/searchBar";
import { Routes, Route, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import SignInButton from "./components/shared/signIn";
import InfoForm from "./components/infoForm/infoForm";

const App = () => {
  const pageSub = useLocation().pathname.split('/')[1];
  const clerk  = useClerk()
  const { session } = useClerk()
  // const {user} = useUser()

  return (
    <div className="flex box-border font-roboto">
      <Navbar />
      <div className="px-4 py-6 w-full bg-stone-100">
        <div className="flex justify-between">
          <p className="flex items-center text-gray-500">Dashboard <ChevronRight size={15}/> <span className="text-black">{pageSub.length ? pageSub : "welcome"}</span></p>
          <div className="w-3/12 flex justify-between items-center">
            <SearchBar/>
            {session ? (
            <>
              {/* {user && <p>{user.fullName}</p>} */}
              {clerk.openSignIn({
                signUpFallbackRedirectUrl: "/about",
              })}
              <UserButton />
            </>
          ): (<SignInButton />)}
          </div>
        </div>
        <Routes>
          <Route path="/" index element={<InfoForm />} />
          <Route path="/about" index element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
