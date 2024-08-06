interface ProfileProps {
  source: string,
}

function Profile({source}: ProfileProps) {
  return(
    <div className="profile">
      <img src={source} alt="profile" />
    </div>
  );
}

export default Profile;