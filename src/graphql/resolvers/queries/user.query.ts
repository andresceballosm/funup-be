import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-errors';
import { userModel } from '../../../models/user.model';

export default {
  user: async (root: any, { id }: { id: string }) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UserInputError(`${id} is not a valid user ID`);
    }

    return await userModel.findOne({ _id: id });
  }
};
