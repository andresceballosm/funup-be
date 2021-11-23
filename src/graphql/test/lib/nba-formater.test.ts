import { NbaFormatter } from "../../../lib/formatters/nba-formatter";
import { nbaLeagues } from "../factories/leagues";

describe('NbaFormatter', () => {
  const nbaFormatter = new NbaFormatter(nbaLeagues.data);
  describe('getTeams', () => {
    it('returns all the teams', () => {
      const teams = nbaFormatter.getTeams();

      expect(teams.length).not.toEqual(0);
      expect(teams).toEqual(
        [
          {
            sportRadarId: 'sr:competitor:3433',
            name: 'Toronto Raptors',
            country: 'USA',
            countryCode: 'USA',
            abbreviation: 'TOR',
            state: 'NC',
            logo: 'https://s3.amazonaws.com/static.qa.fanalyst.us/leagues/nba.png',
            coverImage: 'https://s3.amazonaws.com/static.dev.fanalyst.us/jc-gellidon-XmYSlYrupL8-unsplash.jpg'
          },
          {
            sportRadarId: 'sr:competitor:3430',
            name: 'Charlotte Hornets',
            country: 'USA',
            countryCode: 'USA',
            abbreviation: 'CHA',
            state: 'NC',
            logo: 'https://s3.amazonaws.com/static.qa.fanalyst.us/leagues/nba.png',
            coverImage: 'https://s3.amazonaws.com/static.dev.fanalyst.us/jc-gellidon-XmYSlYrupL8-unsplash.jpg'
          }
        ]
      )
    });
  });
});