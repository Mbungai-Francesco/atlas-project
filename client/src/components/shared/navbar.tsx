import { navRoutes } from "@/constants";
import { Link } from "react-router-dom";

const Navbar = () => {
  const routes = navRoutes();

  return (
    <div className="h-14 border-b items-center flex fixed top-0 left-0 w-full bg-white">
      Navbar
      <ul className="flex gap-10 max-w-3xl justify-between mx-auto w-full">
        {routes.map((route) => (
          <Link to={route.path}>{route.name}</Link>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
