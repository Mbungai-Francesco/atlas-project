interface StudentProps {
  sub: (val: string) => void
}

const Student = ({sub}: StudentProps) => {
  sub('Class overview')
  return(
    <>
      <div></div>
      <div></div>
    </>
  );
};

export default Student;
