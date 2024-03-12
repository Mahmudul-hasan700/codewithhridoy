// models/googleuser.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IGoogleUser extends Document {
  email: string;
  name: string;
  profilePicture?: string;
}

const GoogleUserSchema: Schema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  profilePicture: { type: String },
});

const GoogleUser = mongoose.model<IGoogleUser>('GoogleUser', GoogleUserSchema);

export default GoogleUser;