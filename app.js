import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./router/authRouter.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/ErrorHandler.js";

dotenv.config();

const app = express();
const port = 3000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "backend",
  });
});

//parent router
app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//connection db
mongoose.connect(process.env.DATABASE, {}).then(() => {
  console.log("database connect");
});
