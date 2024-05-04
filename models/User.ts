import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  profileUrl: string;
  resetPasswordToken: string | undefined;
  resetPasswordExpires: Date | undefined;
  emailVerificationToken: string | undefined;
  isEmailVerified: boolean;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profileUrl: { type: String, default: '/R.png' },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  emailVerificationToken: { type: String },
  isEmailVerified: { type: Boolean, default: false },
});

export default mongoose.models.User || mongoose.model<User>('User', UserSchema);