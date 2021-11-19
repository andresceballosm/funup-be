import squadMutation from './squad.mutation';
import squadQuery from './squad.query';

export default {
  Query: {
    ...squadQuery
  },
  Mutation: {
    ...squadMutation
  },
};
