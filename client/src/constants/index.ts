import { useMemo } from "react";
import { Users, User, ChartNoAxesColumnIncreasing } from "lucide-react";

export const navRoutes = () => {
  const routes = useMemo(
    () => [
      {
        name: 'Students',
        path: "/",
        icon: Users
      },
      {
        name: 'Profile',
        path: "/about",
        icon: User
      },
      {
        name: 'Analysis',
        path: "/analysis",
        icon: ChartNoAxesColumnIncreasing
      },
    ],
    []
  );

  return routes;
};
