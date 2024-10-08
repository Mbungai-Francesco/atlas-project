import { navRoutes } from "@/constants";
import { Link, useLocation } from "react-router-dom";
import { icons, Pencil } from "lucide-react";
import { ModeToggle } from "../../mode-toogle";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Sidebar = () => {
	const routes = navRoutes();
	const [usertype, setUserType] = useState<string>();

	useEffect(() => {
		if (!usertype) {
			setUserType(localStorage.getItem("type") || "");
		}
	}, [usertype]);

	return (
		<aside className="fixed inset-y-0 border-border z-10 hidden w-14 flex-col border-r py-4 bg-background sm:flex items-center justify-between">
			<div className="flex flex-col gap-10">
				<div className="bg-primary h-10 w-10 rounded-lg flex items-center justify-center">
					<Pencil className="w-4 h-4 " />
				</div>
				{usertype && (
					<ul className="flex flex-col items-center gap-5 max-w-3xl mx-auto w-full">
						{routes.map((route) => {
							console.log(`${route.type == usertype}`);
							if (route.type == usertype) {
								return (
									<SidebarItem
										key={route.name}
										label={route.name}
										path={route.path}
										icon={route.icon as keyof typeof icons}
									/>
								);
							} else return null;
						})}
					</ul>
				)}
			</div>
			<ModeToggle />
		</aside>
	);
};

export default Sidebar;

interface SidebarItemsProps {
	label: string;
	path: string;
	icon: keyof typeof icons;
	isMobile?: boolean;
}

export function SidebarItem({
	label,
	path,
	icon,
	isMobile,
}: SidebarItemsProps) {
	const Icon = icons[icon];

	const { pathname } = useLocation();

	const isActive = pathname === path;

	return (
		<>
			{!isMobile && (
				<TooltipProvider delayDuration={10}>
					<Tooltip>
						<TooltipTrigger
							className={cn(
								"h-10 w-10 rounded-md flex items-center justify-center",
								{
									"bg-secondary ": isActive,
								}
							)}
						>
							<Link
								to={path}
								className={cn(
									"rounded-lg flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground h-full w-full",
									{
										"text-foreground": isActive,
									}
								)}
							>
								<Icon className="w-5 h-5" />
							</Link>
						</TooltipTrigger>
						<TooltipContent align="start" side="right">
							{label}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
			{isMobile && (
				<Link
					className={cn("flex items-center gap-3 p-2 rounded-lg", {
						"bg-muted": isActive,
					})}
					to={path}
				>
					<Icon className="w-5 h-5" />
					<span>{label}</span>
				</Link>
			)}
		</>
	);
}
