"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db = () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error("MONGO_URI is not defined ");
        return;
    }
    mongoose_1.default
        .connect(mongoUri)
        .then(() => {
        console.log("connected to db");
    })
        .catch((Error) => {
        console.error("Error in connecting db ", Error);
    });
};
exports.default = db;
