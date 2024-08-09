import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { configDotenv } from "dotenv";
import db from "./db";
//routes
import questionsRoute from "./routes/questionsRoute";
import userRoute from "./routes/userRoute";
import { Admin } from "./websockets/gameSocket";

//connectdb
const app = express();
configDotenv({ path: "./.env" });
db();
app.use(express.json())
//creatingroutes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/question", questionsRoute);

//creating-server
const server = http.createServer(app);
export const io = new Server(server);
Admin(io, "defaultRoomName");


app.get("/", (req, res) => {
  res.json("hello kasa ho app log");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
