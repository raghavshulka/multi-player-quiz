import express from "express";
import { userSchemas } from "../schemas/userSchema";

const app = express.Router();

app.post("/new", async (req, res) => {
  try {
    const { name } = req.body;

    const data = await userSchemas.create({
      name: name,
    });

    res.json({
      data,
      msg: "succesfull of geeting name atribute ",
      status: 200,
    });
  } catch (error) {
    console.error(error)
    res.json({ msg: "failure of geeting name atribute ", status: 500 });
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

export default app;
