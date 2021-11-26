import _ from 'lodash';
import { sportRadarIdsForNCAAF } from '../../graphql/test/factories/leagues';
import { FormatterInferface } from './formatter-interface';

export class NcaamFormatter implements FormatterInferface {
  private data:any;

  constructor(data: any) {
    this.data = data;
  }

  getTeams = () => {
    const conferences = _.flattenDeep(this.data.divisions.map((division:any) => division.conferences));
    const teams = _.flattenDeep(conferences.map((conference:any) => conference.teams));
    const teamsMatchingSportMania = teams.filter((team) => sportRadarIdsForNCAAF.includes(team.id));

    return teamsMatchingSportMania.map((team:any) => {
        return {
          sportRadarId: team.id,
          name: `${team.market} ${team.name}`,
          country: team.venue.country,
          abbreviation: team.alias,
          state: team.venue.state,
          logo: this.getTeamLogo(),
          coverImage: this.getCoverImage()
        }
    }) as any;
  }

  // TODO: do api request using SportsRadarId to get competitor/league logo
  // Make sure to make it generic to be able to be used in the nfl formater as well
  private getTeamLogo = () => {
    return 'https://s3.amazonaws.com/static.qa.fanalyst.us/leagues/ncaaf.png'
  }

  private getCoverImage = () => {
    return 'https://s3.amazonaws.com/static.dev.fanalyst.us/jc-gellidon-XmYSlYrupL8-unsplash.jpg';
  }
}