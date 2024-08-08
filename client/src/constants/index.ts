import { useMemo } from "react";
import { Users, User } from "lucide-react";

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
    ],
    []
  );

  return routes;
};
