import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

//router
import authRouter from "./router/authRouter.js";
import questionRouter from "./router/questionRouter.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/ErrorHandler.js";

dotenv.config();

const app = express();
const port = 3000;

//middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//parent router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/question", questionRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//connection db
mongoose.connect(process.env.DATABASE, {}).then(() => {
  console.log("database connect");
});
