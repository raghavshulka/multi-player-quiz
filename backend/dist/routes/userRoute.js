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
        const data = yield userSchema_1.userSchemas.create({
            name: name,
        });
        res.json({
            data,
            msg: "succesfull of geeting name atribute ",
            status: 200,
        });
    }
    catch (error) {
        console.error(error);
        res.json({ msg: "failure of geeting name atribute ", status: 500 });
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
exports.default = app;
