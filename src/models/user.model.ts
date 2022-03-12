import { Schema, Document, model } from 'mongoose';
import { USER_ROLES } from '../constants/user.constants';

export interface UserInput {
  name: string;
  email: string;
  img: string;
  active: boolean;
  onboardingCompleted: boolean;
  google: boolean;
  password: string;
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Missing name'],
    },
    email: {
      type: String,
      required: [true, 'Missing email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Missing password'],
    },
    img: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      required: true,
      emun: USER_ROLES,
    },
    active: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model('User', UserSchema);
