import { model, Schema, Document } from 'mongoose';
import { FeedPreferences, feedPreferencesSchema } from './feed-preferences.model';
import { SmallTeam, smallTeamSchema } from './small-team';

export interface UserInput {
  name: string;
  email: string;
  photo: string;
  bio: string;
  active: string;
  firebaseUid: string;
  onboardingCompleted: boolean;
  feedPreferences: FeedPreferences;
  teams: SmallTeam[];
}
export interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: [true, 'Missing email'],
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    firebaseUid: {
      type: String,
      required: [true, 'Missing firebase uid'],
    },
    bio: String,
    photo: String,
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
    feedPreferences: feedPreferencesSchema,
    teams: [smallTeamSchema],
  },
  { timestamps: true }
);

export const userModel = model<UserDocument>('User', userSchema);
