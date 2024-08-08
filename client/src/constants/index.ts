import { useMemo } from "react";
import { Users, User, ChartNoAxesColumnIncreasing } from "lucide-react";

export const navRoutes = () => {
  const routes = useMemo(
    () => [
      {
        name: 0,
        path: "/",
        icon: Users
      },
      {
        name: 1,
        path: "/about",
        icon: User
      },
      {
        name: 2,
        path: "/analysis",
        icon: ChartNoAxesColumnIncreasing
      },
    ],
    []
  );

  return routes;
};
