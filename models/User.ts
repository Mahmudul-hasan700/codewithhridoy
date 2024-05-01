import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  profileUrl: String,
  provider: {
    type: String,
    required: true,
    enum: ["email", "google", "github"],
  },
  githubProfile: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User; 