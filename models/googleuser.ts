// models/googleuser.ts

import mongoose, { Document, Schema, Model } from 'mongoose';

export interface GoogleUserDocument extends Document {
  email: string;
  username: string;
  profile: string;
}

const googleUserSchema: Schema<GoogleUserDocument> = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  profile: { type: String },
});

const GoogleUser: Model<GoogleUserDocument> = mongoose.models.GoogleUser || mongoose.model<GoogleUserDocument>('GoogleUser', googleUserSchema);

export default GoogleUser;