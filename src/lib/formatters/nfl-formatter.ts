import _ from 'lodash';
export interface NflFormatter {
  getTeams():any;
}

export class NflFormatter {
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
        name: team.name,
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