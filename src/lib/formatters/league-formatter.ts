import _ from 'lodash';
export interface LeagueFormatter {
  getTeams(): any
}

export class LeagueFormatter {
  private data:any;

  constructor(data:any) {
    this.data = data;
  }

  getTeams = () => {
    const leagueName = this.data.season.competition.name;
    const groups = _.flattenDeep(this.data.stages.map((competitors:any) => competitors.groups));
    const competitors = _.uniqBy(_.flattenDeep(groups.map((group:any) => _.flattenDeep(group.competitors))), 'name');
    return competitors.map((competitor:any) => {
      return {
        sportRadarId: competitor.id,
        name: competitor.name,
        country: competitor.country,
        countryCode: competitor.country_code,
        abbreviation: competitor.abbreviation,
        state: competitor.state,
        logo: this.getTeamLogo(leagueName),
        coverImage: this.getCoverImage()
      }
    }) as any;
  }

  // TODO: do api request using SportsRadarId to get competitor/league logo
  // Make sure to make it generic to be able to be used in the nfl formater as well
  private getTeamLogo = (leagueName:string) => {
    return `https://s3.amazonaws.com/static.qa.fanalyst.us/leagues/${leagueName.toLocaleLowerCase()}.png`
  }

  private getCoverImage = () => {
    return 'https://s3.amazonaws.com/static.dev.fanalyst.us/jc-gellidon-XmYSlYrupL8-unsplash.jpg';
  }
}