import Description from "@/components/shared/description";
import Students from "@/components/studProgress/studList";
import StudProfile from "@/components/studProgress/studProfile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

interface StudentProps {}

const Student = ({}: StudentProps) => {
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      redirect("/auth/sign-in");
    }
  }, [userId]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="">
          <CardHeader>
            <CardTitle>Student List</CardTitle>
            <CardDescription>
              View and manage your students progess and perfromance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Students />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
            <CardDescription>
              Detailed view of a student&apos;s academic progress and
              performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StudProfile />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Student;
