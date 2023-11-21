import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="mx-auto p-3 max-w-lg">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePic}
          alt="Profile Pic"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
        />

        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3 outline-none "
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="E-mail"
          className="bg-slate-100 rounded-lg p-3 outline-none"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3 outline-none "
        />
        <button className="uppercase bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-95">
          Update
        </button>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer ">Delete Account</span>
          <span className="text-red-700 cursor-pointer ">Sign Out</span>
        </div>
      </form>
    </div>
  );
};

export default Profile;
