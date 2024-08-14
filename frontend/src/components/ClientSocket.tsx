import { useEffect } from "react";
import { io } from "socket.io-client";

const ClientSocket = () => {
  useEffect(() => {
    const socket = io("https://multi-player-quiz.onrender.com");

    const username = "himanshu";
    socket.emit("connect_user", { name: username });
  }, []);

  return <div>ClientSocket</div>;
};

export default ClientSocket;
