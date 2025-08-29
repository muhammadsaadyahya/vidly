const Profile = ({ user }) => {
  return (
    <div
      style={{
        textAlign: "center",
        height: "70vh",
        alignContent: "center",
      }}
    >
      <h1 className="text-white">Hello {user.name}!Welcome</h1>;
    </div>
  );
};

export default Profile;
