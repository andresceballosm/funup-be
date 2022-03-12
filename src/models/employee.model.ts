import { Schema } from 'mongoose';

export interface Employee {
  id: string;
  name: string;
  img: string;
  email: string;
  active: boolean;
}

export interface EmployeeDocument extends Employee, Document {
  createdAt: Date;
  updatedAt: Date;
}

export const EmployeeSchema = new Schema(
  {
    id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    name: String,
    img: String,
    email: String,
    active: Boolean,
  },
  { timestamps: true }
);
