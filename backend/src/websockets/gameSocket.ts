import { Server, Socket } from "socket.io";
import { userSchemas } from "../schemas/userSchema";
import { quizSchema } from "../schemas/quizSchema";

export function Admin(io: Server, roomName: string) {
  io.on("connection", (socket: Socket) => {
    console.log(`New connection: ${socket.id}`);
    socket.on("connect", handleConnect(socket));
    socket.on("invite", handleInvite(socket, roomName));
    socket.on("accept", handleAccept(io, socket));
  });
}

function handleConnect(socket: Socket) {
  return async (data: { name: string }) => {
    // console.log(`New connection: ${socket.id}`);
    console.log(`Received connect event with data: ${JSON.stringify(data)}`);
    try {
      await userSchemas.findOneAndUpdate(
        { name: data.name },
        { socketid: socket.id }
      );

      console.log(`Updated socketid for ${data.name} to ${socket.id}`);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
}


function handleInvite(socket: Socket, roomName: string) {
  return (data: { roomName: string }) => {
    try {
      if (data.roomName === roomName) {
        const inviteLink = `${process.env.BASE_URL}/join/${roomName}?id=${socket.id}`;
        socket.emit("invite-link", inviteLink);
        return inviteLink;
      }
    } catch (error) {
      console.error("Error creating invite link:", error);
      socket.emit("error", "Failed to create invite link");
    }
  };
}

function handleAccept(io: Server, socket: Socket) {
  return async (data: {
    topic: string;
    socketid: string;
    mysocketid: string;
  }) => {
    try {
      const count = await quizSchema.countDocuments({ topic: data.topic });
      const questions = await getRandomQuestions(data.topic, count, 5);

      if (questions.length === 5)  {
       await  io
          .to(data.socketid)
          .to(data.mysocketid)
          .emit("accepted", questions);
      } else {
        console.log(
          `Failed to retrieve enough questions. Retrieved: ${questions.length}`
        );
        socket.emit("error", "Failed to retrieve enough questions");
      }
    } catch (error) {
      console.error("Error in accept event handler:", error);
      socket.emit("error", "An error occurred while processing your request");
    }
  };
}

async function getRandomQuestions(
  topic: string,
  totalCount: number,
  desiredCount: number
) {
  const questions = [];
  const usedIndices = new Set<number>();

  while (questions.length < desiredCount && usedIndices.size < totalCount) {
    const randomIndex = Math.floor(Math.random() * totalCount);

    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);

      const question = await quizSchema.findOne({ topic }).skip(randomIndex);

      if (question) {
        questions.push(question);
      }
    }
  }

  return questions;
}
