import { leagueModel } from '../../../models/league.model';

export default {
  leagues: async () => await leagueModel.find({}),
};
