import _ from 'lodash';
import { FormatterInferface } from './formatter-interface';
export class NflFormatter implements FormatterInferface {
  private conferences:any;

  constructor(conferences:any) {
    this.conferences = conferences;
  }

  private getDivisions = () => _.flattenDeep(this.conferences.map((conf:any) => conf.divisions)) as any;
  getTeams = () => {
    return _.flattenDeep(this.getDivisions().map((team:any) => team.teams))
      .map((team:any) => {
      return {
        sportRadarId: team.id,
        name: `${team.venue.city} ${team.name}`,
        country: team.venue.country,
        abbreviation: team.alias,
        state: team.venue.state,
        logo: this.getLogo(),
        coverImage: this.getCoverImage()
      }
    }) as any;
  }

  private getLogo = () => {
    return 'https://s3.amazonaws.com/static.qa.fanalyst.us/leagues/nfl.png';
  }

  private getCoverImage = () => {
    return 'https://s3.amazonaws.com/static.dev.fanalyst.us/jc-gellidon-XmYSlYrupL8-unsplash.jpg';
  }
}