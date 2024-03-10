import mongoose, { Schema, Document } from 'mongoose';

// Define interface for GitHub user document
interface IGitHubUser extends Document {
  login: string;
  name: string;
  email: string;
  avatarUrl: string;
  // Add other fields as needed
}

// Define GitHub user schema
const GitHubUserSchema: Schema = new Schema({
  login: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  avatarUrl: { type: String },
  // Define other fields as needed
});

// Create and export GitHub user model
export default mongoose.model<IGitHubUser>('GitHubUser', GitHubUserSchema);