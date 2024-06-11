import mongoose, { Document, Schema } from "mongoose";

// Interface definition for User
interface User extends Document {
  name: string;
  email: string;
  password?: string;
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
  provider: "email" | "google" | "github";
  emailVerificationToken?: string;
  isEmailVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

// Schema definition for User
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar_url: {
      type: String,
      default: "https://i.ibb.co/sCR821K/jwoc1.jpg"
    },
    provider: {
      type: String,
      required: true,
      enum: ["email", "google", "github"],
      default: "email"
    },
    emailVerificationToken: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add a virtual field 'id' to return the _id field as a string
UserSchema.virtual("id").get(function (this: User) {
  return this._id.toHexString();
});

// Create index for email to improve query performance
UserSchema.index({ email: 1 });

// Model export
export default mongoose.models.User ||
  mongoose.model<User>("User", UserSchema);
