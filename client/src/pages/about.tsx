interface AboutProps {
  sub: (val: string) => void
}

const About = ({sub}: AboutProps) => {
  sub('about')
  return <div>About</div>;
};

export default About;
