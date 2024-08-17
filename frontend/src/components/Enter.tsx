import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Enter = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");
  const navigate = useNavigate(); // Initialize the navigate hook

  const closeModal = () => {
    setIsOpen(false);
    navigate("/"); // Navigate to the root ("/") page
  };

  async function handlerClick(e: any) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://multi-player-quiz.onrender.com/api/v1/user/new",
        {
          name: name,
        }
      );
      await localStorage.setItem("auth", res.data.name);
    } catch (error) {
      console.error(error);
    }
    setName("");
    // setInterval(() => {
      navigate("/"); 
    // }, 2000);
  }

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded-lg shadow-lg md:w-full max-w-md p-6 space-y-4">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="text-2xl font-semibold text-gray-900">
            Enter Your Name
          </h2>
          <form onSubmit={handlerClick}>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              placeholder="Login with name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full mt-6 px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default Enter;
