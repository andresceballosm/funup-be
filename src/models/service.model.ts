import { Schema } from 'mongoose';

export interface Category {
    name: string;
}

export interface Service {
  name: string;
  description: string;
  category: string;
  img: string;
  price: number;
  currency: string;
  active: boolean;
  physical: boolean;
  serviceByTime: boolean;
  duration?: number;
  unit?: string; // minutes, hours, days
}

export interface ServiceDocument extends Service, Document {
  createdAt: Date;
  updatedAt: Date;
}

export const ServiceSchema = new Schema(
  {
    name: String,
    description: String,
    category: Array,
    img: String,
    price: Number,
    currency: String,
    active: Boolean,
    physical: Boolean,
    serviceByTime: Boolean,
    duration: Number,
    unit: String
  },
  { timestamps: true }
);
