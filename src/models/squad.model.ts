import { Schema, Document } from 'mongoose';
import { SmallTeam, smallTeamSchema } from './small-team';
import { SmallUser, smallUserSchema } from './small-user';

export interface SquadInput {
  name: string;
  bio: string;
  photo: string;
  banner: string;
  teams: [SmallTeam];
  captain: SmallUser;
  members: [SmallUser];
}
export interface SquadDocument extends SquadInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

export const squadSchema = new Schema(
  {
    name: String,
    bio: String,
    photo: String,
    banner: String,
    teams: [smallTeamSchema],
    captain: smallUserSchema,
    members: [smallUserSchema],
  },
  { timestamps: true }
);
