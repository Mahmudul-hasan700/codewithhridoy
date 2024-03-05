// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  profileUrl: string; 
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profileUrl: { type: String, default: '/R.png' },
});

export default mongoose.models.User || mongoose.model<User>('User', UserSchema);