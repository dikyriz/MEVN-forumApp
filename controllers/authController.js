import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOption = {
    expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    security: false,
  };

  res.cookie("jwt", token, cookieOption);

  user.password = undefined;

  res.status(statusCode).json({
    data: user,
  });
};

export const RegisterUser = asyncHandler(async (req, res) => {
  const createUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(createUser, 201, res);
});
export const LoginUser = asyncHandler(async (req, res) => {
  //validasi email dan password tidak boleh kosong
  if (!req.body.email && !req.body.password) {
    res.status(400);
    throw new Error("inputan email dan password tidak boleh kosong");
  }
  //validasi email sudah terdaftar pada database
  const userData = await User.findOne({
    email: req.body.email,
  });

  if (userData && (await userData.comparePassword(req.body.password))) {
    createSendToken(userData, 200, res);
  } else {
    res.status(400);
    throw new Error("invalid user");
  }
});
export const LogoutUser = (req, res) => {
  res.send("logout success");
};
export const getUser = (req, res) => {
  res.send("get user success");
};
