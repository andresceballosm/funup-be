import { UserInputError } from 'apollo-server-errors';
import mongoose from 'mongoose';
import { squadModel } from '../../../models/squad.model';

interface FindSquadInput {
  id: string;
}

export default {
  squads: async () => await squadModel.find({}),
  squadById : async (_: any, context: FindSquadInput) => {
    if (!mongoose.Types.ObjectId.isValid(context.id)) {
      throw new UserInputError(`${context.id} is not a valid ID`);
    }

    return await squadModel.findById(context.id);
  },
};
