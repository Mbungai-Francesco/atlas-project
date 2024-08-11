import SearchBar from "@/components/ui/searchBar";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import BreadcrumbNavigation from "./breadcrumb";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-background h-20 p-6">
      <BreadcrumbNavigation />
      <div className="flex justify-between items-center  h-full">
        <SearchBar />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
