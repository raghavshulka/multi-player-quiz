import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { allContext } from "../Context/CreateStore";

const JoinRoom = () => {
  const { setData, setResult } = useContext(allContext);

  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [username] = useState(localStorage.getItem("auth") || "");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [questionReceived, setQuestionReceived] = useState(false);

  useEffect(() => {
    const newSocket = io("https://multi-player-quiz.onrender.com");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("user_connected", () => {
        setMessage("Successfully connected to server");
      });

      socket.on("time", ({ time }) => {
        console.log("Time received:", time);
        setTime(time);
        setRemainingTime(Math.floor(time / 1000)); // Convert milliseconds to seconds
      });

      socket.on("join_room", (data) => {
        setMessage(`Joined room: ${data.roomName}`);
      });

      socket.on("result", (resultData) => {
        console.log("User score received:", resultData);
        setResult(resultData);
      });

      socket.on("data", (question) => {
        setData(question);
        setQuestionReceived(true);
        console.log("Question received:", question);
      });

      socket.on("error", (errorMessage) => {
        setMessage(`Error: ${errorMessage}`);
      });
    }
  }, [socket, setResult, setData]);

  useEffect(() => {
    if (time !== null && questionReceived) {
      console.log("Navigating after time delay:", time);
      const timer = setTimeout(() => {
        navigate("/question");
      }, time);

      return () => clearTimeout(timer); // Cleanup the timeout on unmount or time change
    } 
  }, [time, questionReceived, navigate]);

  useEffect(() => {
    if (remainingTime !== null && remainingTime > 0) {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => (prevTime !== null ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [remainingTime]);

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (socket && username && roomName) {
      socket.emit("connect_user", { name: username });
      socket.emit("join_room", { roomName: roomName });
      socket.emit("recivescore", username);
      socket.emit("scores", { name: username });
    } else {
      setMessage("Error: Username or Room Name is missing");
    }
    setRoomName("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen border-t bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Join a Room
        </h1>
        {message && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
            {message}
          </div>
        )}
        {remainingTime !== null && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded text-center">
            Waiting time to enter quiz: {remainingTime} seconds
          </div>
        )}
        <form onSubmit={handleJoinRoom}>
          <div className="mb-6">
            <label
              htmlFor="roomCode"
              className="block text-gray-700 font-semibold mb-2"
            >
              Room Code
            </label>
            <input
              id="roomCode"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room code"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full py-3 bg-black/90 hover:opacity-90 text-white rounded-md font-semibold transition duration-200"
            >
              Join Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
