import { UserButton } from "@clerk/clerk-react";
import { icons, PanelLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/searchBar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navRoutes } from "@/constants";
import BreadcrumbNavigation from "./breadcrumb";
import { SidebarItem } from "./sidebar";
import { useEffect, useState } from "react";

const Navbar = () => {
	const routes = navRoutes();
	const [usertype, setUserType] = useState<string>();

	useEffect(() => {
		setUserType(localStorage.getItem("type") || "");
	}, [usertype]);

	return (
		<header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4  px-4  sm:border-0 sm:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button size="icon" variant="outline" className="sm:hidden">
						<PanelLeft className="h-5 w-5" />
						<span className="sr-only">Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="sm:max-w-xs">
					{usertype && (
						<nav className="grid gap-6 text-lg font-medium py-10">
							{routes.map((route) => {
								console.log(`${route.type == usertype}`);
								if (route.type == usertype) {
									return (
										<SidebarItem
											isMobile
											key={route.name}
											label={route.name}
											icon={route.icon as keyof typeof icons}
											path={route.path}
										/>
									);
								}
                else return null
							})}
						</nav>
					)}
				</SheetContent>
			</Sheet>
			<BreadcrumbNavigation />
			<div className="flex justify-between items-center  h-full gap-4">
				<SearchBar />
				<UserButton
					appearance={{
						elements: {
							userButtonAvatarBox: {
								width: "40px",
								height: "40px",
							},
						},
					}}
				/>
			</div>
		</header>
	);
};

export default Navbar;
