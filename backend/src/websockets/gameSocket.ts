import { Server, Socket } from "socket.io";
import { userSchemas } from "../schemas/userSchema";
import { quizSchema } from "../schemas/quizSchema";

function gameSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`New connection connected in server : ${socket.id}➡️`);

    socket.on("connect_user", handleConnectUser(socket));
    socket.on("create_room", handleCreateRoom(socket));
    socket.on("join_room", handleJoinRoom(io, socket));
    socket.on("scores", handlerScore(socket));

    socket.on("disconnect", () => {
      console.log(`User got disconnected in server ${socket.id} ❌`);
    });
  });
}

function handleConnectUser(socket: Socket) {
  return async (data: { name: string }) => {
    console.log(
      `Received connect event with data: ${JSON.stringify(data.name)} `
    );
    try {
      await userSchemas.findOneAndUpdate(
        { name: data.name },
        { socketid: socket.id }
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

const roomInfo = new Map<string, { time: number }>();

function handleCreateRoom(socket: Socket) {
  return (data: { roomName: string; topic: string; time: number }) => {
    try {
      const { roomName, topic, time } = data;
      socket.join(roomName);

      // Store the topic information in the socket's data
      socket.data.roomTopic = topic;

      const inviteLink = `${"http://localhost:3000"}/join/${roomName}`;
      socket.emit("room_created", { roomName, inviteLink, time });

      roomInfo.set(roomName, { time });

      console.log(`Room created: ${roomName} with topic: ${topic} 🔥`);

      socket.to(roomName).emit("room1", `Welcome to room ${roomName}`);
    } catch (error) {
      console.error("Error creating room:", error);
      socket.emit("error", "Failed to create room");
    }
  };
}

function handleJoinRoom(io: Server, socket: Socket) {
  return async (data: { roomName: string }) => {
    try {
      const { roomName } = data;
      const roomExists = io.sockets.adapter.rooms.has(roomName);

      if (!roomExists) {
        return socket.emit("error", "Room does not exist");
      }

      socket.join(roomName);
      const room = roomInfo.get(roomName);
      if (!room) {
        return socket.emit("error", "Room information not found");
      }

      const { time } = room;
      socket.emit("time", { time });

      // Retrieve the topic from any user already in the room
      const roomTopic = Array.from(
        io.sockets.adapter.rooms.get(roomName) || []
      ).map((socketId) => io.sockets.sockets.get(socketId)?.data.roomTopic)[0];

      const questions = await getRandomQuestions(roomTopic, 4);
      socket.emit("data", questions);

      if (questions.length === 4) {
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

function handlerScore(socket: Socket) {
  return async (data: { name: string }) => {
    try {
      const name = data.name;

      if (!name) {
        socket.emit("error", "Name is required to retrieve the score.");
        return;
      }

      const result = await getResult(name);

      if (!result) {
        socket.emit("error", `No result found for user ${name}.`);
        return;
      }

      socket.emit("result", result);
      console.log("Result for user", name, ":", result);
    } catch (error) {
      console.error(`Error in getting ${data.name} result:`, error);
      socket.emit("error", "An error occurred while retrieving the score.");
    }
  };
}

async function getRandomQuestions(topic: string, desiredCount: number) {
  try {
    const questions = await quizSchema
      .find({ topic: topic })
      .limit(desiredCount)
      .exec();
    // console.log("Retrieved questions:", questions);
    return questions;
  } catch (error) {
    console.error("Error retrieving random questions:", error);
    return [];
  }
}

async function getResult(name: string) {
  try {
    console.log(`Querying results for user: ${name}`);
    const result = await userSchemas.findOne({ name: name }).exec();

    if (!result) {
      console.log(`No result found for user ${name}.`);
      return null;
    }

    console.log(`Result found for user ${name} ⭐:`, result);
    return result;
  } catch (error) {
    console.error("Error retrieving results:", error);
    return null;
  }
}

export default gameSocket;
