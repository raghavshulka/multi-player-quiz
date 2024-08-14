"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemas = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    socketid: {
        type: String,
        require: true,
        default: "",
    },
    score: {
        type: Number,
        require: true,
        default: 0,
    },
});
exports.userSchemas = mongoose_1.default.model("Users", userSchema);
