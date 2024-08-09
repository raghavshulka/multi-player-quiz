import icon from "../assets/icon.svg";

const Profile = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg max-w-md mx-auto mt-8">
      <div className="flex items-center justify-center mb-4">
        <img src={icon} alt="Profile Icon" className="w-24 h-24 rounded-full border-2 border-gray-200" />
      </div>
      <div className="text-center">
        <p className="text-2xl font-semibold text-gray-800 mb-2">Name</p>
        <p className="text-lg text-gray-600">Score</p>
      </div>
    </div>
  );
};

export default Profile;
