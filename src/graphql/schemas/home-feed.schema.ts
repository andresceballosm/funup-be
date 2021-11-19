import { gql } from 'apollo-server-express';

export const homeFeedSchema = gql`
  type TweetTeam {
    abbreviation: String
    image: String
    league: String
  }
  type Tweet {
    id_str: String
    userName: String
    userImage: String
    text: String
    mainImage: String
    url: String
    team: TweetTeam
    createdAt: String
    timestamp: String
  }
  type HomeFeed {
    cursor: String
    tweets: [Tweet]!
  }
  extend type Query {
    homeFeed(firebaseUid: String!, cursor: String, limit: Int): HomeFeed
  }
`;
