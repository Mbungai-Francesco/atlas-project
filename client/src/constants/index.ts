import { useMemo } from "react";

export const navRoutes = () => {
  const routes = useMemo(
    () => [
      {
        name: "Students",
        path: "/",
        icon: "Unplug",
      },
      {
        name: "Profile",
        path: "/about",
        icon: "User",
      },
      {
        name: "Analysis",
        path: "/analysis",
        icon: "ChartNoAxesColumnIncreasing",
      },
    ],
    []
  );

  return routes;
};
