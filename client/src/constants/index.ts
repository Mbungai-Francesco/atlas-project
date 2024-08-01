import { useMemo } from "react";

export const navRoutes = () => {
  const routes = useMemo(
    () => [
      {
        name: "home",
        path: "/",
      },
      {
        name: "about",
        path: "/about",
      },
    ],
    []
  );

  return routes;
};
