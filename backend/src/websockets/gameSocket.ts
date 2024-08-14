import { Server, Socket } from "socket.io";
import { userSchemas } from "../schemas/userSchema";
import { quizSchema } from "../schemas/quizSchema";

 function gameSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`New connection connected in server : ${socket.id}`);

    socket.on("connect_user", handleConnectUser(socket));
    socket.on("create_room", handleCreateRoom(socket));
    socket.on("join_room", handleJoinRoom(io, socket));
    socket.on("disconnect", () => {
      console.log(`user got disconnect in server ${socket.id} ❌`);
    });
  });
}

function handleConnectUser(socket: Socket) {
  return async (data: { name: string }) => {
    console.log(`Received connect event with data: ${JSON.stringify(data.name)}`);
    try {
      await userSchemas.findOneAndUpdate(
        { name: data.name },
        { socketid: socket.id },
      );
      console.log(`Updated socketId for ${data.name} to ${socket.id}`);
      socket.emit("user_connected", { success: true });
    } catch (error) {
      console.error("Error updating user:", error);
      socket.emit("user_connected", {
        success: false,
        error: "Failed to update user",
      });
    }
  };
}

function handleCreateRoom(socket: Socket) {
  return (data: { roomName: string }) => {
    try {
      const roomName = data.roomName || `room-${Date.now()}`;
      socket.join(roomName);
      const inviteLink = `${process.env.BASE_URL}/join/${roomName}`;
      socket.emit("room_created", { roomName, inviteLink });
    } catch (error) {
      console.error("Error creating room:", error);
      socket.emit("error", "Failed to create room");
    }
  };
}

function handleJoinRoom(io: Server, socket: Socket) {
  return async (data: { roomName: string; topic: string }) => {
    try {
      const { roomName, topic } = data;
      const roomExists = io.sockets.adapter.rooms.has(roomName);

      if (!roomExists) {
        return socket.emit("error", "Room does not exist");
      }

      socket.join(roomName);
      const questions = await getRandomQuestions(topic, 5);

      if (questions.length === 5) {
        io.to(roomName).emit("game_starting", { questions });
      } else {
        socket.emit("error", "Failed to retrieve enough questions");
      }
    } catch (error) {
      console.error("Error in join room handler:", error);
      socket.emit("error", "An error occurred while processing your request");
    }
  };
}

async function getRandomQuestions(topic: string, desiredCount: number) {
  try {
    const questions = await quizSchema.aggregate([
      { $match: { topic } },
      { $sample: { size: desiredCount } },
    ]);
    return questions;
  } catch (error) {
    console.error("Error retrieving random questions:", error);
    return [];
  }
}

export default gameSocket;