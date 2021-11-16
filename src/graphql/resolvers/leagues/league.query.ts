import { leagueModel, TeamDocument } from '../../../models/league.model';

interface FindTeamInput {
  leagueName: string;
  sportRadarId: string;
}

export default {
  leagues: async () => await leagueModel.find({}),
  teamById : async (_: any, context: FindTeamInput) => {
    const league = await leagueModel.findOne({name: context.leagueName});
    return league?.teams.find((team : TeamDocument) => team.sportRadarId == context.sportRadarId);
  }
};
