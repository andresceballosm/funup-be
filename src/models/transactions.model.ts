import { Schema } from 'mongoose';

export interface Balance {
    currency: string;
    balance: number;
}

export interface BalanceDocument extends Balance, Document {
  createdAt: Date;
  updatedAt: Date;
}

export const BalanceSchema = new Schema(
  {
    currency: String,
    balance: Number,
  },
  { timestamps: true }
);
