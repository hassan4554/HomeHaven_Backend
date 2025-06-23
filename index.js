import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectMongoDB } from "./configs/mongoDB.config.js";
import routes from "./routes/index.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { AppError } from "./utils/appError.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);
app.get("/ping", (req, res) => {
  return res.send("pong");
});

// app.all("*", (req, res, next) => {
//   return next(new AppError("API not found", 404));
// });

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  connectMongoDB();
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION 💥", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION 💥", err);
  process.exit(1);
});

app.use(globalErrorHandler);

export default app;
