import { getDatabase } from '../../../db';
import { SportsRadar } from '../../../modules/sportsradar.module';

export default {
  populateLeagues: async () => {
    await getDatabase().leagueModel.replaceOne(
      { name: 'NFL' },
      {
        name: 'NFL',
        logo: 'https://s3.amazonaws.com/static.qa.fanalyst.us/leagues/nfl.png',
        teams: await new SportsRadar(
          '',
          process.env.SPORTS_RADAR_NFL_API_KEY || '',
          'nfl'
        ).getNflLeagues()
      },
      { upsert: true }
    );

    await getDatabase().leagueModel.replaceOne(
      { name: 'NCAAF' },
      {
        name: 'NCAAF',
        logo: 'https://s3.amazonaws.com/static.qa.fanalyst.us/leagues/ncaaf.png',
        teams: await new SportsRadar(
          '',
          process.env.SPORTS_RADAR_AMERICAN_FOOTBAL_API_KEY || '',
          'ncaamb'
        ).getNacaaLeagues()
      },
      { upsert: true }
    );

    await getDatabase().leagueModel.replaceOne(
      { name: 'NBA' },
      {
        name: 'NBA',
        logo: 'https://s3.amazonaws.com/static.qa.fanalyst.us/leagues/nba.png',
        teams: await new SportsRadar(
          'sr:competition:132',
          process.env.SPORTS_RADAR_GLOBAL_BASKET_API_KEY || '',
          'basketball'
        ).getNbaLeagues()
      },
      { upsert: true }
    );
  }
}