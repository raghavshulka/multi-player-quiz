import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique:true,
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

export const userSchemas = mongoose.model("Users", userSchema);
