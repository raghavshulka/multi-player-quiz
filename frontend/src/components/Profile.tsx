import axios from "axios";
import icon from "../assets/icon.svg";
import { useEffect, useState } from "react";

const Profile = () => {
  const [val, setVal] = useState<{ name: string; score: number }>({
    name: "",
    score: 0,
  });

  const [rank, setRank] = useState<{ name: string; score: number }[]>([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      handlerScore();
      getuser();
    }, 1000);

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [setVal]);

  async function handlerScore() {
    const names = localStorage.getItem("auth");

    const res = await axios.post("https://multi-player-quiz.onrender.com/api/v1/user/detail", {
      name: names,
    });

    setVal(res.data.existingUser);
  }

  async function getuser() {
    const res = await axios.get("https://multi-player-quiz.onrender.com/api/v1/user/all");

    setRank(res.data.data);
  }
  return (
    <>
      <div className="flex flex-col items-center p-4 bg-white  rounded-lg max-w-md mx-auto mt-8">
        <div className="flex items-center justify-center mb-4">
          <img
            src={icon}
            alt="Profile Icon"
            className="w-24 h-24 rounded-full border-2 border-gray-200"
          />
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-800 mb-2">
            {val.name}
          </p>
          <p className=" inline-flex text-lg text-gray-600">
            score {val.score}
          </p>
        </div>
      </div>
      <div className=" mt-8   md:mx-32 px-11 mx-6 my-4 border rounded-md p-6 shadow-lg ">
        <h2 className=" text-center text-3xl font-semibold pb-6 ">
          Leaderboard
        </h2>
        <div className=" flex items-center justify-between pb-4">
          <p className="font-semibold text-2xl">Name</p>
          <p className="font-semibold text-2xl">Score</p>
        </div>
        {rank.map((val, id) => (
          <div key={id} className="  grid grid-cols-2 leading-tight  gap-2">
            <div className=" flex text-gray-600 justify-start font-semibold text-lg ">
              {val.name}
            </div>
            <div className=" flex justify-end font-semibold text-gray-600 text-lg ">
              {val.score}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
