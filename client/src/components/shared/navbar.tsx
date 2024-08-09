import { navRoutes } from "@/constants";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional for styling

const Navbar = () => {
	const routes = navRoutes();
	const iconSize = 19;

	return (
		<div className="h-screen border-r flex flex-col justify-between px-4 py-6">
			<ul className="flex flex-col items-center gap-5 max-w-3xl mx-auto w-full">
				<div className="bg-black p-2 rounded-full w-fit">
					<Pencil size={iconSize} color="white" />
				</div>
				{routes.map((route) => (
					<Tippy content={route.name} key={route.path} placement="right">
						<Link
							className="text-gray-400 focus:text-black p-2 focus:bg-gray-100 rounded-md"
							to={route.path}>
							<route.icon size={iconSize} />
						</Link>
					</Tippy>
				))}
			</ul>
		</div>
	);
};

export default Navbar;
