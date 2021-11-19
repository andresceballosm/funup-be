import { UserInputError } from 'apollo-server-errors';
import mongoose from 'mongoose';
import { getDatabase } from '../../../db';

interface FindSquadInput {
  id: string;
}

export default {
  squads: async () => await getDatabase().squadModel.find({}),
  squadById: async (_: any, context: FindSquadInput) => {
    if (!mongoose.Types.ObjectId.isValid(context.id)) {
      throw new UserInputError(`${context.id} is not a valid ID`);
    }

    return await getDatabase().squadModel.findById(context.id);
  },
};
