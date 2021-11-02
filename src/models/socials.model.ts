import { Schema } from 'mongoose';

export interface Socials {
  youtube: string;
}

export const socialsSchema = new Schema({
  youtube: String,
});