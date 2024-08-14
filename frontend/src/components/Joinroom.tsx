import { useState } from "react";

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");

  const handleJoinRoom = (e: any) => {
    e.preventDefault();
    setRoomCode("");
    console.log(roomCode);
  };

  return (
    <div className="flex items-center justify-center min-h-screen border-t  bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Join a Room
        </h1>
        <div className="mb-4"></div>
        <form  onSubmit={handleJoinRoom}>
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
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Enter room code"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full py-3 bg-black/90 hover:opacity-90 text-white rounded-md font-semibold  transition duration-200"
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
