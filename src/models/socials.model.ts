import { Schema } from 'mongoose';

interface Podcast {
  name: string;
  description: string;
  id: string;
  image: {
    url: string;
    heigth: number;
    width: number;
  };
}
export interface Socials {
  youtube: {
    channelId: string;
  };
  twitter: {
    userID: string;
    userName: string;
  };
  spotify: {
    refreshToken: string;
    podcasts: Podcast[];
  };
}

export const socialsSchema = new Schema({
  youtube: {
    type: {
      channelId: String,
    },
    default: null,
  },
  twitter: {
    type: {
      userID: String,
      userName: String,
    },
    default: null,
  },
  spotify: {
    type: {
      refreshToken: {
        type: String,
        default: null,
      },
      podcasts: {
        type: [
          {
            name: String,
            description: String,
            id: String,
            image: {
              url: String,
              width: Number,
              heigth: Number,
            },
          },
        ],
        default: [],
      },
    },
    default: null,
  },
});
