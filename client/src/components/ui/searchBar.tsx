// Date: 03/20/2021
import { Search } from "lucide-react";
import { Input } from "./input";

function SearchBar() {
  return (
    <div className="flex items-center rounded-lg w-full border border-border px-2">
      <Search size={16} color="gray" />
      <Input
        type="text"
        placeholder="Search"
        className="bg-transparent border-transparent border"
      />
    </div>
  );
}

export default SearchBar;
