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
const userSchema_1 = require("../schemas/userSchema");
const app = express_1.default.Router();
app.post("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ msg: "Please fill  fields", status: 400 });
        }
        const existingUser = yield userSchema_1.userSchemas.findOne({ name });
        if (existingUser) {
            return res.status(200).json(existingUser);
        }
        const newUser = yield userSchema_1.userSchemas.create({ name });
        return res.status(201).json(newUser);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Internal Server Error", message: error.message });
    }
}));
app.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userSchema_1.userSchemas.find({});
        res.json({ data, status: 200 });
    }
    catch (error) {
        res.json({ msg: "error in getting names", status: 501 });
    }
}));
app.post("/detail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            return res.json({ status: 400 });
        }
        const existingUser = yield userSchema_1.userSchemas.findOne({ name });
        res.json({ existingUser });
    }
    catch (error) {
        res.json({ msg: "error in getting names", status: 501 });
    }
}));
exports.default = app;
