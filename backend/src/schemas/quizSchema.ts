import mongoose from "mongoose";

const schemas = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export const quizSchema = mongoose.model("Questions",schemas)