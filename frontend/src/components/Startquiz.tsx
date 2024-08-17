import axios from "axios";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
type Data = {
  roomName: string;
  username: string;
  topic: string;
  answer?: string;
};

const Startquiz = () => {
  //main
  const username: string = localStorage.getItem("auth") as string;
  const [topic, setTopic] = useState<{ topic: string }[]>([]);
  const [room, setRoom] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  //sockets
  const [socketData, setSocketData] = useState<Data | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [time, setTime] = useState<number | null>(null);
  console.log(time);
  const handleChange = (e: any) => {
    setTime(e.target.value);
  };

  //output
  const [invite, setInvite] = useState("");
  const [inviteroom, setInviteRoom] = useState("");

  useEffect(() => {
    getData();
    const newSocket = io("https://multi-player-quiz.onrender.com");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
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
    }
  }, [socket]);

  async function getData() {
    const val = await axios.get(
      "https://multi-player-quiz.onrender.com/api/v1/question/topic"
    );
    setTopic(val.data.data);
  }

  function handleJoinRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (socket) {
      socket.emit("connect_user", { name: username });

      socket.emit("create_room", {
        roomName: room,
        topic: selectedTopic,
        time: time,
      });

      socket.emit("join_room", { roomName: room });
    }

    setRoom("");
    setSelectedTopic("");
  }

  return (
    <div className="flex items-center justify-center min-h-screen border-t bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Start Quiz
        </h1>
        <div className="mb-4"></div>
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
              htmlFor="roomCode"
              className="block text-gray-700 font-semibold mb-2"
            >
              Waiting Time
            </label>
            <input
              type="number"
              id="roomCode"
              className="w-full p-3 border border-gray-300 rounded-md"
              onChange={handleChange}
              placeholder="Enter room waiting time in milisec"
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
              name="Topics"
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
          <div className="mt-6">
            <h3 className="font-semibold">Your Link:</h3>
            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
              {/* {JSON.stringify(socketData, null, 2)} */}
              {inviteroom}
            </pre>

            <h3 className="font-semibold">Room Link:</h3>
            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
              {/* {JSON.stringify(socketData, null, 2)} */}
              {invite}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Startquiz;
