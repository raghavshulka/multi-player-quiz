import { useContext } from "react";
import { allContext } from "../Context/CreateStore";
import icon from "../assets/icon.svg";

const Profile = () => {
  const { userDetail, leaderboard } = useContext(allContext);

  return (
    <>
      <div className="flex flex-col items-center p-4 bg-white rounded-lg max-w-md mx-auto mt-8">
        <div className="flex items-center justify-center mb-4">
          <img
            src={icon}
            alt="Profile Icon"
            className="w-24 h-24 rounded-full border-2 border-gray-200"
          />
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-800 mb-2">
            {userDetail.name}
          </p>
          <p className="inline-flex text-lg text-gray-600">
            score {userDetail.score}
          </p>
        </div>
      </div>
      <div className="mt-8 md:mx-32 px-11 mx-6 my-4 border rounded-md p-6 shadow-lg">
        <h2 className="text-center text-3xl font-semibold pb-6">Leaderboard</h2>
        <div className="flex items-center justify-between pb-4">
          <p className="font-semibold text-2xl">Name</p>
          <p className="font-semibold text-2xl">Score</p>
        </div>
        {leaderboard.map((val, id) => (
          <div key={id} className="grid grid-cols-2 leading-tight gap-2">
            <div className="flex text-gray-600 justify-start font-semibold text-lg">
              {val.name}
            </div>
            <div className="flex justify-end font-semibold text-gray-600 text-lg">
              {val.score}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
