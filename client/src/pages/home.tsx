interface HomeProps {
  sub: (val: string) => void
}

const Home = ({sub}: HomeProps) => {
  sub('home')
  return <div>Home</div>;
};

export default Home;
