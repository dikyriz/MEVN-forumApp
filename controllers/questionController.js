import Question from "../models/Question.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const CreateQuestion = asyncHandler(async (req, res) => {
  const { title, question, category } = req.body;

  const newQuestion = await Question.create({
    title,
    question,
    category,
    userId: req.user._id,
  });

  return res.status(200).json({
    message: "berhasil input question",
    data: newQuestion,
  });
});
export const QuestionsAll = (req, res) => {
  res.send("tampil semua pertanyaan");
};
export const DetailQuestion = (req, res) => {
  res.send("detail pertanyaan");
};
export const UpdateQuestion = (req, res) => {
  res.send("update pertanyaan");
};
export const DeleteQuestion = (req, res) => {
  res.send("delete pertanyaan");
};
