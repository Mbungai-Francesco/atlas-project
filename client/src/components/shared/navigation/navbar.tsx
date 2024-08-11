import { UserButton } from "@clerk/clerk-react";
import { icons, PanelLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/searchBar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navRoutes } from "@/constants";
import BreadcrumbNavigation from "./breadcrumb";
import { SidebarItem } from "./sidebar";

const Navbar = () => {
  const routes = navRoutes();
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
          <nav className="grid gap-6 text-lg font-medium py-10">
            {routes.map((route) => (
              <SidebarItem
                isMobile
                key={route.name}
                label={route.name}
                icon={route.icon as keyof typeof icons}
                path={route.path}
              />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <BreadcrumbNavigation />
      <div className="flex justify-between items-center  h-full">
        <SearchBar />
        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;
