import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        trim: true 
    },
    password: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("Users", userSchema);
