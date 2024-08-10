"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemas = new mongoose_1.default.Schema({
    topic: {
        type: String,
        require: true,
    },
    question: {
        type: String,
        require: true,
    },
    option1: {
        type: String,
        require: true,
    },
    option2: {
        type: String,
        require: true,
    },
    option3: {
        type: String,
        require: true,
    },
    option4: {
        type: String,
        require: true,
    },
    correctOption: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: false,
        default: "",
    },
    timer: {
        type: Number,
        require: true,
    },
}, { timestamps: true });
exports.quizSchema = mongoose_1.default.model("Questions", schemas);
