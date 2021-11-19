import { Schema } from 'mongoose';

export interface SmallUser {
  firebaseUid: string;
  name: string;
  photo: string;
}

export const smallUserSchema = new Schema({
  firebaseUid: String,
  name: String,
  photo: String
});