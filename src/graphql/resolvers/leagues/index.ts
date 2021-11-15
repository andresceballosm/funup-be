import leagueQuery from './league.query';
import leagueMutation from './league.mutation';

export default {
  Query: {
    ...leagueQuery,
  },
  Mutation: {
    ...leagueMutation
  },
};
