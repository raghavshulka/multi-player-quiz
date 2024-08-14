"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocketServer = initializeSocketServer;
const userSchema_1 = require("../schemas/userSchema");
const quizSchema_1 = require("../schemas/quizSchema");
function initializeSocketServer(io) {
    io.on("connection", (socket) => {
        console.log(`New connection connected in server : ${socket.id}`);
        socket.on("connect_user", handleConnectUser(socket));
        socket.on("create_room", handleCreateRoom(socket));
        socket.on("join_room", handleJoinRoom(io, socket));
        socket.on("disconnect", () => {
            console.log(`user got disconnect in server ${socket.id} ❌`);
        });
    });
}
function handleConnectUser(socket) {
    return (data) => __awaiter(this, void 0, void 0, function* () {
        console.log(`Received connect event with data: ${JSON.stringify(data.name)}`);
        try {
            yield userSchema_1.userSchemas.findOneAndUpdate({ name: data.name }, { socketid: socket.id });
            console.log(`Updated socketId for ${data.name} to ${socket.id}`);
            socket.emit("user_connected", { success: true });
        }
        catch (error) {
            console.error("Error updating user:", error);
            socket.emit("user_connected", {
                success: false,
                error: "Failed to update user",
            });
        }
    });
}
function handleCreateRoom(socket) {
    return (data) => {
        try {
            const roomName = data.roomName || `room-${Date.now()}`;
            socket.join(roomName);
            const inviteLink = `${process.env.BASE_URL}/join/${roomName}`;
            socket.emit("room_created", { roomName, inviteLink });
        }
        catch (error) {
            console.error("Error creating room:", error);
            socket.emit("error", "Failed to create room");
        }
    };
}
function handleJoinRoom(io, socket) {
    return (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { roomName, topic } = data;
            const roomExists = io.sockets.adapter.rooms.has(roomName);
            if (!roomExists) {
                return socket.emit("error", "Room does not exist");
            }
            socket.join(roomName);
            const questions = yield getRandomQuestions(topic, 5);
            if (questions.length === 5) {
                io.to(roomName).emit("game_starting", { questions });
            }
            else {
                socket.emit("error", "Failed to retrieve enough questions");
            }
        }
        catch (error) {
            console.error("Error in join room handler:", error);
            socket.emit("error", "An error occurred while processing your request");
        }
    });
}
function getRandomQuestions(topic, desiredCount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const questions = yield quizSchema_1.quizSchema.aggregate([
                { $match: { topic } },
                { $sample: { size: desiredCount } },
            ]);
            return questions;
        }
        catch (error) {
            console.error("Error retrieving random questions:", error);
            return [];
        }
    });
}
