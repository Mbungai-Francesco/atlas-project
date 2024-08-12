import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, redirect } from "react-router-dom";

const AuthLayout = () => {
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      redirect("/");
    }
  }, [userId]);

  return (
    <div className="h-screen w-full">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
