// Date: 03/20/2021
import { Search } from "lucide-react";

function SearchBar(){
    return (
        <div className="flex items-center border p-2 rounded-lg w-full mr-2 bg-white">
          <Search size={16} color="gray" className="mr-2"/>
          <input type="text" placeholder="Search" className="outline-none"/>
        </div>
    )
}

export default SearchBar;