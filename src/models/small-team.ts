import { Schema } from 'mongoose';

export interface SmallTeam {
  name: string;
  league: string;
  sportRadarId: string;
  sportsManiaId: string;
  logo: string;
  abbreviation: string
}

export const smallTeamSchema = new Schema({
  name: String,
  league: String,
  sportRadarId: String,
  sportsManiaId: String,
  logo: String,
  abbreviation: String
});
