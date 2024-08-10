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
exports.Admin = void 0;
const userSchema_1 = require("../schemas/userSchema");
const quizSchema_1 = require("../schemas/quizSchema");
function Admin(io, roomName) {
    io.on("connection", (socket) => {
        console.log(`New connection: ${socket.id}`);
        socket.on("connect", handleConnect(socket));
        socket.on("invite", handleInvite(socket, roomName));
        socket.on("accept", handleAccept(io, socket));
    });
}
exports.Admin = Admin;
function handleConnect(socket) {
    return (data) => __awaiter(this, void 0, void 0, function* () {
        // console.log(`New connection: ${socket.id}`);
        console.log(`Received connect event with data: ${JSON.stringify(data)}`);
        try {
            yield userSchema_1.userSchemas.findOneAndUpdate({ name: data.name }, { socketid: socket.id });
            console.log(`Updated socketid for ${data.name} to ${socket.id}`);
        }
        catch (error) {
            console.error("Error updating user:", error);
        }
    });
}
function handleInvite(socket, roomName) {
    return (data) => {
        try {
            if (data.roomName === roomName) {
                const inviteLink = `${process.env.BASE_URL}/join/${roomName}?id=${socket.id}`;
                socket.emit("invite-link", inviteLink);
                return inviteLink;
            }
        }
        catch (error) {
            console.error("Error creating invite link:", error);
            socket.emit("error", "Failed to create invite link");
        }
    };
}
function handleAccept(io, socket) {
    return (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const count = yield quizSchema_1.quizSchema.countDocuments({ topic: data.topic });
            const questions = yield getRandomQuestions(data.topic, count, 5);
            if (questions.length === 5) {
                yield io
                    .to(data.socketid)
                    .to(data.mysocketid)
                    .emit("accepted", questions);
            }
            else {
                console.log(`Failed to retrieve enough questions. Retrieved: ${questions.length}`);
                socket.emit("error", "Failed to retrieve enough questions");
            }
        }
        catch (error) {
            console.error("Error in accept event handler:", error);
            socket.emit("error", "An error occurred while processing your request");
        }
    });
}
function getRandomQuestions(topic, totalCount, desiredCount) {
    return __awaiter(this, void 0, void 0, function* () {
        const questions = [];
        const usedIndices = new Set();
        while (questions.length < desiredCount && usedIndices.size < totalCount) {
            const randomIndex = Math.floor(Math.random() * totalCount);
            if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                const question = yield quizSchema_1.quizSchema.findOne({ topic }).skip(randomIndex);
                if (question) {
                    questions.push(question);
                }
            }
        }
        return questions;
    });
}
