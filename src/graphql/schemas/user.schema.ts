import { gql } from 'apollo-server-express';

const youtubeProps = `
  channelId: String
`;

const spotifyPodcastProps = `
  id: String
  description: String
  name: String
`;

const spotifyImageProps = `
  url: String
  heigth: Int
  width: Int
`;

const feedPreferencesProps = `
  articles: Boolean
  tweets: Boolean
  podcasts: Boolean
  videos: Boolean
`;

const teamProps = `
  name: String!
  league: String!
  sportRadarId: String!
  sportsManiaId: String!
  logo: String!
  abbreviation: String!
`;

export const userSchema = gql`
  input FeedPreferencesInput {
    ${feedPreferencesProps}
  }
  type FeedPreferences {
    ${feedPreferencesProps}
  }
  input TeamInput {
    ${teamProps}
  }
  type SmallTeam {
    ${teamProps}
  }
  input YoutubeLinkInput {
    ${youtubeProps}
  }
  type YoutubeLink {
    ${youtubeProps}
  }
  input SpotifyImageInput {
    ${spotifyImageProps}
  }
  type SpotifyImage {
    ${spotifyImageProps}
  }
  input SpotifyPodcastInput {
    image: SpotifyImageInput
    ${spotifyPodcastProps}
  }
  type SpotifyPodcast {
    image: SpotifyImage
    ${spotifyPodcastProps}
  }
  input SpotifyLinkInput {
    podcasts: [SpotifyPodcastInput]
    refreshToken: String
  }
  type SpotifyLink {
    podcasts: [SpotifyPodcast]
    refreshToken: String
  }
  input SocialsInput {
    youtube: YoutubeLinkInput
    spotify: SpotifyLinkInput
  }
  type Socials {
    youtube: YoutubeLink
    spotify: SpotifyLink
  }
  type User {
    id: String
    name: String
    email: String
    bio: String
    socials: Socials
    firebaseUid: String
    onboardingCompleted: Boolean
    feedPreferences: FeedPreferences
    teams: [SmallTeam]
  }
  extend type Query {
    user(id: String!): User
    userByFirebaseUid(firebaseUid: String!): User
  }
  extend type Mutation {
    signup(name: String, email: String!, firebaseUid: String!, photo: String): User
    updateProfile(id: String!, name: String, email: String, bio: String, photo: String): User
    updateSocialMedia(firebaseUid: String!, socials: SocialsInput!): User
    updateTeams(firebaseUid: String!, teams: [TeamInput]): User
    onboarding(email: String, feedPreferences: FeedPreferencesInput, teams: [TeamInput]): User
  }
`;
