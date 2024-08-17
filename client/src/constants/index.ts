import { useMemo } from "react";

export const navRoutes = () => {
  const routes = useMemo(
    () => [
      {
        name: "myClassRooms",
        path: "/myClassrooms",
        icon: "Unplug",
        type: "stud",
      },
      {
        name: "myStudents",
        path: "/myStudents",
        icon: "Users",
        type: "teach"
      },
      {
        name: "classrooms",
        path: "/classrooms",
        icon: "User",
        type: "teach"
      },
    ],
    []
  );

  return routes;
};
