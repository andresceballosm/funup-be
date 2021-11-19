import mongoose, { Connection, Model } from 'mongoose';
import { LeagueDocument, leagueSchema } from '../models/league.model';
import { SquadDocument, squadSchema } from '../models/squad.model';
import { TweetDocument, tweetSchema } from '../models/tweet.model';
import { UserDocument, userSchema } from '../models/user.model';
import fanalystDB from './fanalyst-db';
import sportsmaniasDB from './sportsmania-db';

const createConnections = () => {
  const dbFanalyst = fanalystDB.getConnection();
  const dbSportsmanias = sportsmaniasDB.getConnection();
  return { dbFanalyst, dbSportsmanias };
};

export const disconnectDB = () => {
  fanalystDB.closeConnection();
  sportsmaniasDB.closeConnection();
  mongoose.disconnect();
};

let db: any;

export function getDatabase(): DBConnections {
  if (db) return db;
  return connectDB();
}

function connectDB() {
  const { dbFanalyst, dbSportsmanias } = createConnections();
  const userModel = dbFanalyst.model<UserDocument>('User', userSchema);
  const leagueModel = dbFanalyst.model<LeagueDocument>('League', leagueSchema);
  const squadModel = dbFanalyst.model<SquadDocument>('Squad', squadSchema);
  const tweetModel = dbSportsmanias.model<TweetDocument>('Tweet', tweetSchema);
  db = {
    userModel,
    leagueModel,
    squadModel,
    tweetModel,
    connections: {
      dbFanalyst,
      dbSportsmanias,
    },
  };
  return db;
}

export interface DBConnections {
  userModel: Model<UserDocument>;
  leagueModel: Model<LeagueDocument>;
  tweetModel: Model<TweetDocument>;
  squadModel: Model<SquadDocument>;
  connections: {
    dbFanalyst: Connection;
    dbSportsmanias: Connection;
  };
}
