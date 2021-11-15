import { model, Schema, Document } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  country: string;
  countryCode: string;
  abbreviation: string;
  state: string;
  logo: string;
  coverImage: string;
}

export interface LeagueDocument extends Document {
  name: string;
  logo: string;
  teams: TeamDocument[];
}

const teamSchema = new Schema({
  sportRadarId: String,
  name: String,
  country: String,
  countryCode: String,
  abbreviation: String,
  state: String,
  logo: String,
  coverImage: String,
});

const leagueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: String,
  teams: [teamSchema],
});

export const leagueModel = model<LeagueDocument>('League', leagueSchema);
