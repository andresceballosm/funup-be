import { Schema } from 'mongoose';

export interface Manager {
  id: string;
  name: string;
  img: string;
  email: string;
  active: boolean;
  role: string;
}

export interface ManagerDocument extends Manager, Document {
  createdAt: Date;
  updatedAt: Date;
}

export const ManagerSchema = new Schema(
  {
    id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    name: String,
    img: String,
    email: String,
    active: Boolean,
    role: String,
  },
  { timestamps: true }
);
