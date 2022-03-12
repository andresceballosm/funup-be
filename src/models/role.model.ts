import { Schema, model } from 'mongoose';

export interface RoleInput {
  name: string;
  active: string;
}

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is required'],
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

RoleSchema.methods.toJSON = function () {
  const { ...usuario } = this.toObject();
  return usuario;
};

module.exports = model('Role', RoleSchema);
