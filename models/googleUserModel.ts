// googleUserModel.ts
import mongoose, { Document, Schema } from 'mongoose';

interface GoogleUser extends Document {
  name: string;
  email: string;
  profileUrl: string;
}

const GoogleUserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileUrl: { type: String, required: true },
});

export default mongoose.models.GoogleUser || mongoose.model<GoogleUser>('GoogleUser', GoogleUserSchema);