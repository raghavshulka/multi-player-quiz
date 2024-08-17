import express from "express";
const router = express.Router();
import { quizSchema } from "../schemas/quizSchema";

router.post("/create", async (req, res) => {
  try {
    const {
      topic,
      question,
      option1,
      option2,
      option3,
      option4,
      correctOption,
      image,
      timer,
    } = req.body;

    if (
      !topic ||
      !question ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !correctOption ||
      !timer
    ) {
      return res
        .status(400)
        .json({ msg: "Please fill all fields", status: 400 });
    }

    const newQuiz = await quizSchema.create({
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

    res
      .status(201)
      .json({
        data: newQuiz,
        msg: "Quiz question created successfully",
        status: 201,
      });
  } catch (error) {
    console.error("Error creating quiz question:", error);
    res
      .status(500)
      .json({ msg: "Failed to create quiz question", status: 500 });
  }
});

// Get all quiz questions
router.get("/all", async (req, res) => {
  try {
    const data = await quizSchema.find();

    res.status(200).json({ data, status: 200 });
  } catch (error) {
    console.error("Error retrieving quiz questions:", error);
    res
      .status(500)
      .json({ msg: "Failed to retrieve quiz questions", status: 500 });
  }
});

router.get("/topic", async (req, res) => {
  try {
    const data = await quizSchema.find({}, "topic");
    res.json({ data, status: 200 });
  } catch (error) {
    res.json({ msg: "error in getting names", status: 501 });
  }
});

export default router;
