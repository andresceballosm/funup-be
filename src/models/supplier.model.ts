import { Schema, Document, model } from 'mongoose';
import { Service, ServiceSchema } from './service.model';
import { Balance, BalanceSchema } from './transactions.model';

export interface SupplierInput {
  country: string;
  city: string;
  services: Service[];
  payment_methods: any[];
  user: string;
  withdrawAccount: any[],
  balance: Balance[]
}

export interface UserDocument extends SupplierInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema(
  {
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    active: {
      type: Boolean,
      default: true,
    },
    country: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    services: {
      type: [ServiceSchema],
      default: []
    },
    balance: {
      type: [BalanceSchema],
      default: []
    },
    withdrawAccount: {
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

module.exports = model('Supplier', ClientSchema);
