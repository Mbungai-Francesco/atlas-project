import { useMemo } from "react";

export const navRoutes = () => {
  const routes = useMemo(
    () => [
      {
        name: "myClassRooms",
        path: "/myClassrooms",
        icon: "Unplug",
        type: "TEACHER",
      },
      {
        name: "myStudents",
        path: "/myStudents",
        icon: "Users",
        type: "ALL"
      },
    ],
    []
  );

  return routes;
};
