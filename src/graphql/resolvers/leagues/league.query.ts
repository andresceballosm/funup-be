import { getDatabase } from '../../../db';
import { TeamDocument } from '../../../models/league.model';

interface FindTeamInput {
  leagueName: string;
  sportRadarId: string;
}

export default {
  leagues: async () => await getDatabase().leagueModel.find({}),
  teamById: async (_: any, context: FindTeamInput) => {
    const league = await getDatabase().leagueModel.findOne({ name: context.leagueName });
    return league?.teams.find((team: TeamDocument) => team.sportRadarId == context.sportRadarId);
  },
};
