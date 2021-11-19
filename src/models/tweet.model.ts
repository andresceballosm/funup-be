import { Document, Schema } from 'mongoose';

interface Media {
  type: string;
  media_url_https: string;
  url: string;
}

interface Entities {
  media: Media[];
}

interface TaggedTeam {
  strAlias: string;
  strShortName: string;
  league: {
    strName: string;
    strCode: string;
  };
}

interface Writer {
  description: string;
  profile_image_url: string;
  strName: string;
  twitter: string;
  teams: TaggedTeam[];
}

interface TweetUser {
  name: string;
  screen_name: string;
  profile_image_url_https: string;
}

interface Oid {
  $oid: string;
}

interface ClassificationWithLeague {
  league: string;
  team: string;
  leagueId: Oid;
  teamId: Oid;
  tweetLeague: {
    leagueName: string;
    teamName: string;
    leagueId: Oid;
    teamId: Oid;
  };
}

export interface TweetDocument extends Document {
  id_str: string;
  truncated: boolean;
  type: string;
  text: string;
  entities: Entities;
  writer: Writer;
  user: TweetUser;
  extended_tweet: {
    full_text: string;
    entities: Entities;
  };
  classificationWithLeague: ClassificationWithLeague;
  created_at: Date;
  expanded_url: string;
  timestamp_ms: number;
}

const entitiesSchema = new Schema({
  media: {
    type: [
      {
        type: { type: String },
        media_url_https: String,
        url: String,
      },
    ],
  },
});

const oidSchema = new Schema({
  $oid: String,
});

export const tweetSchema = new Schema({
  id_str: String,
  truncated: Boolean,
  type: String,
  text: String,
  entities: entitiesSchema,
  writer: {
    type: {
      description: String,
      profile_image_url: String,
      strName: String,
      twitter: String,
      teams: {
        type: [
          {
            strAlias: String,
            strShortName: String,
            league: {
              type: {
                strName: String,
                strCode: String,
              },
            },
          },
        ],
      },
    },
  },
  user: {
    type: {
      name: String,
      screen_name: String,
      profile_image_url_https: String,
    },
  },
  extended_tweet: {
    full_text: String,
    entities: entitiesSchema,
  },
  classificationWithLeague: {
    league: String,
    team: String,
    leagueId: oidSchema,
    teamId: oidSchema,
    tweetLeague: {
      type: [
        {
          leagueName: String,
          teamName: String,
          leagueId: oidSchema,
          teamId: oidSchema,
        },
      ],
    },
  },
  created_at: Date,
  expanded_url: String,
  timestamp_ms: Number,
});
