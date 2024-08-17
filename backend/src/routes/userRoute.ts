import express from "express";
import { userSchemas } from "../schemas/userSchema";

const app = express.Router();

app.post("/new", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Please fill  fields", status: 400 });
    }

    const existingUser = await userSchemas.findOne({ name });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const newUser = await userSchemas.create({ name });

    return res.status(201).json(newUser);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

app.get("/all", async (req, res) => {
  try {
    const data = await userSchemas.find({});
    res.json({ data, status: 200 });
  } catch (error) {
    res.json({ msg: "error in getting names", status: 501 });
  }
});

app.post("/detail", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ status: 400 });
    }

    const existingUser = await userSchemas.findOne({ name });

    res.json({ existingUser });
  } catch (error) {
    res.json({ msg: "error in getting names", status: 501 });
  }
});

app.post("/score", async (req, res) => {
  const { name, score } = req.body;
  try {
    const data = await userSchemas.findOneAndUpdate(
      {
        name:name,
      },
      {
        score:score,
      }
    );

    res.json({ data , status: 200 });
  } catch (error) {
    res.json({ msg: "error in getting names", status: 501 });
  }
});

export default app;
