import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { allContext } from "../Context/CreateStore";
import { useNavigate } from "react-router-dom";

type Data = {
  roomName: string;
  username: string;
  topic: string;
  answer?: string;
};

const Startquiz = () => {
  const username: string = localStorage.getItem("auth") as string;
  const [topic, setTopic] = useState<{ topic: string }[]>([]);
  const [room, setRoom] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [socketData, setSocketData] = useState<Data | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [invite, setInvite] = useState("");
  const [inviteroom, setInviteRoom] = useState("");
  const [roomJoined, setRoomJoined] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  const { socket } = useContext(allContext);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("user_connected", () => {
        console.log("Successfully connected to socket server");
      });

      socket.on("room_created", ({ roomName, inviteLink }) => {
        setInviteRoom(` ${roomName}`);
        setInvite(`${inviteLink}`);
      });

      socket.on("data", (receivedData: Data) => {
        setSocketData(receivedData);
      });

      socket.on("game_starting", ({ questions }) => {
        console.log("Game is starting!");
        console.log("Questions:", questions);
      });

      socket.on("error", (errorMessage) => {
        console.error("Socket error:", errorMessage);
      });

      return () => {
        socket.off("user_connected");
        socket.off("room_created");
        socket.off("data");
        socket.off("game_starting");
        socket.off("error");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (timerStarted && remainingTime !== null && remainingTime > 0) {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => (prevTime !== null ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timerStarted, remainingTime]);

  async function getData() {
    try {
      const val = await axios.get(
        "https://multi-player-quiz.onrender.com/api/v1/question/topic"
      );
      setTopic(val.data.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10);
    setTime(value);
    setRemainingTime(Math.floor(value / 1000));
  }

  function handleJoinRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTimerStarted(true); // Start the timer when Generate is clicked

    if (socket) {
      socket.emit("connect_user", { name: username });
      socket.emit("create_room", {
        roomName: room,
        topic: selectedTopic,
        time: time,
      });
      socket.emit("join_room", { roomName: room });
      setRoomJoined(true);
    }

    setRoom("");
    setSelectedTopic("");
  }

  function handleJoinsRoom() {
    if (roomJoined) {
      console.log("Navigating after time delay:", time);
      navigate("/join");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen border-t bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Start Quiz
        </h1>
        {remainingTime !== null && remainingTime > 0 && (
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
              Room Name
            </label>
            <input
              id="roomCode"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter room code"
              required
            />

            <label
              htmlFor="waitingTime"
              className="block text-gray-700 font-semibold mb-2"
            >
              Waiting Time
            </label>
            <input
              type="number"
              id="waitingTime"
              className="w-full p-3 border border-gray-300 rounded-md"
              onChange={handleChange}
              placeholder="Enter room waiting time in milliseconds"
              required
            />

            <label
              htmlFor="topicSelect"
              className="block text-gray-700 font-semibold mb-2"
            >
              Select Topic
            </label>
            <select
              id="topicSelect"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-black text-pretty font-sans"
              required
            >
              <option value="" disabled>
                Select a topic
              </option>
              {topic.map((val, id) => (
                <option key={id} value={val.topic}>
                  {val.topic}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full py-3 bg-black/90 hover:opacity-90 text-white rounded-md font-semibold transition duration-200"
            >
              Generate
            </button>
          </div>
        </form>
        {socketData && (
          <>
            <div className="mt-6">
              <h3 className="font-semibold">Your Room:</h3>
              <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
                {inviteroom}
              </pre>

              <h3 className="font-semibold">Room Link:</h3>
              <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
                {invite}
              </pre>
            </div>
            <button
              onClick={handleJoinsRoom}
              className="w-full mt-3 py-3 bg-black/90 hover:opacity-90 text-white rounded-md font-semibold transition duration-200"
            >
              Join Room
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Startquiz;
