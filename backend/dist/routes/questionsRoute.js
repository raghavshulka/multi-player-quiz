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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const quizSchema_1 = require("../schemas/quizSchema");
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { topic, question, option1, option2, option3, option4, correctOption, image, timer, } = req.body;
        if (!topic ||
            !question ||
            !option1 ||
            !option2 ||
            !option3 ||
            !option4 ||
            !correctOption ||
            !timer) {
            return res.status(400).json({ msg: "Please fill all fields", status: 400 });
        }
        const newQuiz = yield quizSchema_1.quizSchema.create({
            topic,
            question,
            option1,
            option2,
            option3,
            option4,
            correctOption,
            image,
            timer,
        });
        res.status(201).json({ data: newQuiz, msg: "Quiz question created successfully", status: 201 });
    }
    catch (error) {
        console.error("Error creating quiz question:", error);
        res.status(500).json({ msg: "Failed to create quiz question", status: 500 });
    }
}));
// Get all quiz questions
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield quizSchema_1.quizSchema.find();
        res.status(200).json({ data, status: 200 });
    }
    catch (error) {
        console.error("Error retrieving quiz questions:", error);
        res.status(500).json({ msg: "Failed to retrieve quiz questions", status: 500 });
    }
}));
exports.default = router;
