import userMutation from './user.mutation';
import userQuery from './user.query';

export default {
  Query: {
    ...userQuery,
  },
  Mutation: {
    ...userMutation,
  },
};
