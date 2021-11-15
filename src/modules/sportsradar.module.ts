import axios from 'axios';
import { LeagueFormatter } from '../lib/formatters/league-formatter';
import { NflFormatter } from '../lib/formatters/nfl-formatter';
import { LeagueDocument } from '../models/league.model';

export interface SportsRadar {
  getLastSeasonId(seasons:any):string
  getSeasons():any
  getLeagues():Promise<LeagueDocument>
  getNflLeagues():Promise<any>
}

export class SportsRadar implements SportsRadar {
  private apiKey: string;
  private competitionId: string;
  private sportsRadarEndpoint: string;

  constructor(competitionId: string, apiKey: string, sport: string) {
    if (!apiKey) {
      throw new Error('No SPORTS_RADAR_API_KEY provided');
    }
    this.sportsRadarEndpoint = `http://api.sportradar.us/${sport}/trial/v2/en`;
    this.apiKey = apiKey;
    this.competitionId = competitionId;
  }

  getLastSeasonId(seasons:any):string {
    return seasons.data.seasons[seasons.data.seasons.length - 1].id;
  }

  async getSeasons() {
    return await axios.get(`${this.sportsRadarEndpoint}/competitions/${this.competitionId}/seasons.json?api_key=${this.apiKey}`);
  }

  async getLeagues():Promise<LeagueDocument> {
    await this.sleep(1100);
    const seasonId = this.getLastSeasonId(await this.getSeasons());
    await this.sleep(1100);
    const nflLeagues = await axios.get(`${this.sportsRadarEndpoint}/seasons/${seasonId}/info.json?api_key=${this.apiKey}`);

    return await new LeagueFormatter(nflLeagues.data).getTeams();
  }

  async getNflLeagues():Promise<any> {
    const nflLeagues = await axios.get(`http://api.sportradar.us/nfl/official/trial/v6/en/league/hierarchy.json?api_key=${this.apiKey}`);
    return await new NflFormatter(nflLeagues.data.conferences).getTeams();
  }

  private sleep(seconds:any) {
    return new Promise((resolve) => setTimeout(() => resolve(`waited ${seconds}s`), seconds));
  }
}