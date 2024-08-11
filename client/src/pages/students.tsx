import Description from "@/components/shared/description";
import Students from "@/components/studProgress/studList";
import StudProfile from "@/components/studProgress/studProfile";
import Card from "@/components/ui/card";

interface StudentProps {}

const Student = ({}: StudentProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <Description
            title="Student List"
            description="View and manage your students' progress and performance."
          />
          <Students />
        </Card>
        <Card>
          <Description
            title="Student Profile"
            description="Detailed view of a student's academic progress and performance."
          />
          <StudProfile />
        </Card>
      </div>
    </>
  );
};

export default Student;
