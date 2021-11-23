import axios from 'axios';
import { NbaFormatter } from '../lib/formatters/nba-formatter';
import { NflFormatter } from '../lib/formatters/nfl-formatter';
import { NcaamFormatter } from '../lib/formatters/ncaam-formatter';
import { LeagueDocument } from '../models/league.model';
export interface SportsRadar {
  getLastSeasonId(seasons:any):string
  getSeasons():any
  getNbaLeagues():Promise<LeagueDocument>
  getNflLeagues():Promise<any>
}

export class SportsRadar implements SportsRadar {
  private apiKey: string;
  private competitionId: string;
  private sportsRadarEndpoint: string;

  constructor(competitionId: string, apiKey: string, sport: string) {
    if (!apiKey || apiKey.length === 0) {
      throw new Error('No SPORTS_RADAR_API_KEY provided');
    }
    this.sportsRadarEndpoint = `http://api.sportradar.us/${sport}`;
    this.apiKey = apiKey;
    this.competitionId = competitionId;
  }

  getLastSeasonId(seasons:any):string {
    return seasons.data.seasons[seasons.data.seasons.length - 1].id;
  }

  async getSeasons() {
    return await axios.get(`${this.sportsRadarEndpoint}/trial/v2/en/competitions/${this.competitionId}/seasons.json?api_key=${this.apiKey}`);
  }

  async getNbaLeagues():Promise<LeagueDocument> {
    await this.sleep(1100);
    const seasonId = this.getLastSeasonId(await this.getSeasons());
    await this.sleep(1100);
    const nflLeagues = await axios.get(`${this.sportsRadarEndpoint}/trial/v2/en/seasons/${seasonId}/info.json?api_key=${this.apiKey}`);

    return await new NbaFormatter(nflLeagues.data).getTeams();
  }

  async getNflLeagues():Promise<any> {
    const nflLeagues = await axios.get(`${this.sportsRadarEndpoint}/official/trial/v6/en/league/hierarchy.json?api_key=${this.apiKey}`);
    return await new NflFormatter(nflLeagues.data.conferences).getTeams();
  }

  async getNacaaLeagues():Promise<any> {
    const ncaamLeagues = await axios.get(`${this.sportsRadarEndpoint}/trial/v7/en/league/hierarchy.json?api_key=${this.apiKey}`);
    return await new NcaamFormatter(ncaamLeagues.data).getTeams();
  }

  private sleep(seconds:any) {
    return new Promise((resolve) => setTimeout(() => resolve(`waited ${seconds}s`), seconds));
  }
}