import express from "express";
import http from "http";
import { Server } from "socket.io";
import { configDotenv } from "dotenv";
import db from "./db";
import cors from "cors";
import { initializeSocketServer } from "../src/websockets/gameSocket"; // Import the new function

// routes
import questionsRoute from "./routes/questionsRoute";
import userRoute from "./routes/userRoute";

// connectdb
const app = express();
configDotenv({ path: "./.env" });
db();

app.use(
  cors({
    origin: "*",
    credentials: true, // Optional: If you want to allow cookies or other credentials
  })
);
app.use(express.json());

// creating routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/question", questionsRoute);

// creating server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
    credentials: true, // Optional
  },
});

// Initialize socket server
initializeSocketServer(io);

app.get("/", (req, res) => {
  res.json("hello kasa ho app log");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
