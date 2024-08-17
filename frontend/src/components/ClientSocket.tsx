import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type Data = {
  roomName: string;
  username: string;
  topic: string;
  answer?: string;
};

const ClientSocket = ({ username, roomName, topic }: Data) => {
  const [data, setData] = useState<Data | null>(null); // Initialize the state to store the received data

  useEffect(() => {
    const socket = io("https://multi-player-quiz.onrender.com");

    connectUser(username, socket);
    createRoom(roomName, socket);
    joinRoom(roomName, topic, socket);

    socket.on("user_connected", () => {
      console.log("Successfully connected to socket server");
    });

    socket.on("room_created", ({ roomName, inviteLink }) => {
      console.log(`Room created: ${roomName}`);
      console.log(`Invite link: ${inviteLink}`);
    });

    socket.on("data", (receivedData: Data) => {
      setData(receivedData); // Update the state with received data
    });

    socket.on("game_starting", ({ questions }) => {
      console.log("Game is starting!");
      console.log("Questions:", questions);
    });

    socket.on("error", (errorMessage) => {
      console.error("Socket error:", errorMessage);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [username, roomName, topic]);

  // Connect user
  function connectUser(username: string, socket: Socket) {
    socket.emit("connect_user", { name: username });
  }

  // Create a room
  function createRoom(roomName: string, socket: Socket) {
    socket.emit("create_room", { roomName });
  }

  // Join a room
  function joinRoom(roomName: string, topic: string, socket: Socket) {
    socket.emit("join_room", { roomName, topic });
  }

  // Optionally render the received data
  return (
    <div>
      {data ? (
        <div>
          <h3>Received Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
};

export default ClientSocket;
