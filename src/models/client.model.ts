import { Schema, Document, model } from 'mongoose';
import { Employee, EmployeeSchema } from './employee.model';
import { Manager, ManagerSchema } from './manager.model';

export interface ClientInput {
  active: boolean;
  country: string;
  employees: Employee[];
  img: string;
  email: string;
  managers: Manager[];
  name: string;
  payment_methods: any[];
}

export interface UserDocument extends ClientInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    company:  {
      type: String,
      default: ''
    }, 
    country: {
      type: String,
      default: ''
    },
    employees: {
      type: [EmployeeSchema],
      default: []
    },
    img: {
      type: String,
      default: ''
    },
    managers: {
      type: [ManagerSchema],
      default: []
    },
    payment_methods: {
      type: Array,
      default: []
    },
  },
  { timestamps: true }
);

ClientSchema.methods.toJSON = function () {
  const { __v, _id, ...client } = this.toObject();
  client.uid = _id;
  return client;
};

module.exports = model('Client', ClientSchema);
