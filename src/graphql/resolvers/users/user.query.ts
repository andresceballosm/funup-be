import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-errors';
import { UserDocument } from '../../../models/user.model';
import { getDatabase } from '../../../db';

export default {
  user: async (root: any, context: UserDocument) => {
    // TODO: find a better way to handle this
    if (!mongoose.Types.ObjectId.isValid(context.id)) {
      throw new UserInputError(`${context.id} is not a valid user ID`);
    }

    return await getDatabase().userModel.findOne({ _id: context.id });
  },

  userByFirebaseUid: async (_: any, context: UserDocument) =>
    await getDatabase().userModel.findOne({ firebaseUid: context.firebaseUid }),
};
