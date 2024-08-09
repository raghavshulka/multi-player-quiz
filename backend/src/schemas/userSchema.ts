import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  socketid: {
    type: String,
    require: true,
    default: "",
  },
  score: {
    type: String,
    require: true,
    default: "",
  },
});

export const userSchemas = mongoose.model("Users", userSchema);
