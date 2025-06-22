import mongoose from "mongoose";
export const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("Error connecting DB: " + err));
};
