import { gql } from 'apollo-server-express';

export const userSchema = gql`
  input FeedPreferencesInput {
    articles: Boolean
    tweets: Boolean
    podcasts: Boolean
    videos: Boolean
  }
  type FeedPreferences {
    articles: Boolean
    tweets: Boolean
    podcasts: Boolean
    videos: Boolean
  }
  input TeamInput {
    name: String!
    league: String!
    sportRadarId: String!
    sportsManiaId: String!
  }
  type SmallTeam {
    name: String!
    league: String!
    sportRadarId: String!
    sportsManiaId: String!
  }
  type User {
    name: String
    email: String
    bio: String
    onboardingCompleted: Boolean
    feedPreferences: FeedPreferences
    teams: [SmallTeam]
  }

  extend type Query {
    user(id: String!): User
  }

  extend type Mutation {
    signup(name: String, email: String!, firebaseUid: String!, photo: String): User
    updateProfile(id: String!, name: String, email: String, bio: String, photo: String): User
    onboarding(email: String, feedPreferences: FeedPreferencesInput, teams: [TeamInput]): User
  }
`;
