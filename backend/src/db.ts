import mongoose from "mongoose";

const db = () => {
  const mongoUri: string | undefined = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("MONGO_URI is not defined ");
    return;
  }

  mongoose
    .connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000,
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch((Error) => {
      console.error("Error in connecting db ", Error);
    });
};

export default db;
