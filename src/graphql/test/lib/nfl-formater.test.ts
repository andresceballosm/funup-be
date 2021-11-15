import { NflFormatter } from "../../../lib/formatters/nfl-formatter";
import { nflLeagues } from "../factories/leagues";

describe('NflFormatter', () => {
  const nflFormatter = new NflFormatter(nflLeagues.conferences);
  describe('getTeams', () => {
    it('returns all the teams', () => {
      const teams = nflFormatter.getTeams();

      expect(teams.length).not.toEqual(0);
      expect(teams).toEqual(
        [
          {
            sportRadarId: 'ce92bd47-93d5-4fe9-ada4-0fc681e6caa0',
            name: 'Broncos',
            country: 'USA',
            abbreviation: 'DEN',
            state: 'CO',
            logo: 'https://s3.amazonaws.com/static.qa.fanalyst.us/leagues/nfl.png',
            coverImage: 'https://s3.amazonaws.com/static.dev.fanalyst.us/jc-gellidon-XmYSlYrupL8-unsplash.jpg',
          },
          {
            sportRadarId: 'ce92bd47-93d5-4fe9-ada4-0fc681e6caa0',
            name: 'Broncos',
            country: 'USA',
            abbreviation: 'DEN',
            state: 'CO',
            logo: 'https://s3.amazonaws.com/static.qa.fanalyst.us/leagues/nfl.png',
            coverImage: 'https://s3.amazonaws.com/static.dev.fanalyst.us/jc-gellidon-XmYSlYrupL8-unsplash.jpg',
          }
        ]
      )
    });
  });
});