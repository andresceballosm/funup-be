import { NcaamFormatter } from '../../../lib/formatters/ncaam-formatter';
import { ncaamLeagues, sportRadarIdsForNCAAF } from '../factories/leagues';

describe('NcaamFormatter', () => {
  const ncaamFormatter = new NcaamFormatter(ncaamLeagues);
  describe('getTeams', () => {
    it('returns all the teams', () => {
      const teams = ncaamFormatter.getTeams();

      const expectedTeam = teams.filter((team:any) => team.sportRadarId === sportRadarIdsForNCAAF[0]);
      expect(teams.length).not.toEqual(0);
      expect(expectedTeam).not.toBe(undefined);
    });
  });
});