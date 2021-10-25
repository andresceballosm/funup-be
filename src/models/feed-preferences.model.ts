import { Schema } from 'mongoose';

export interface FeedPreferences {
  articles: boolean;
  tweets: boolean;
  podcasts: boolean;
  videos: boolean;
}

export const feedPreferencesSchema = new Schema({
  articles: {
    type: Boolean,
    default: false,
  },
  tweets: {
    type: Boolean,
    default: false,
  },
  podcasts: {
    type: Boolean,
    default: false,
  },
  videos: {
    type: Boolean,
    default: false,
  },
});
