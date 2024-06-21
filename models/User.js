import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user harus diinput"],
    unique: [true, "user sudah ada"],
  },
  email: {
    type: String,
    required: [true, "email harus diinput"],
    unique: [true, "email sudah ada"],
    validate: {
      validator: validator.isEmail,
      message: "harus format email",
    },
  },
  password: {
    type: String,
    required: [true, "password harus diinput"],
    minLength: 8,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
