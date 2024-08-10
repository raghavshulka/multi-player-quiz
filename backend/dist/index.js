"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = require("dotenv");
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
//routes
const questionsRoute_1 = __importDefault(require("./routes/questionsRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const gameSocket_1 = require("./websockets/gameSocket");
//connectdb
const app = (0, express_1.default)();
(0, dotenv_1.configDotenv)({ path: "./.env" });
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//creatingroutes
app.use("/api/v1/user", userRoute_1.default);
app.use("/api/v1/question", questionsRoute_1.default);
//creating-server
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server);
(0, gameSocket_1.Admin)(exports.io, "defaultRoomName");
app.get("/", (req, res) => {
    res.json("hello kasa ho app log");
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
