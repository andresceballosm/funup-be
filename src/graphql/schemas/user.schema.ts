import { gql } from 'apollo-server-express';

const youtubeProps = `
  channelId: String
`;

const twitterProps = `
  userID: String
  userName: String
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
  input TwitterLinkInput {
    ${twitterProps}
  }
  type TwitterLink {
    ${twitterProps}
  }
  input SocialsInput {
    youtube: YoutubeLinkInput
    spotify: SpotifyLinkInput
    twitter: TwitterLinkInput
  }
  input FollowedUsersInput {
    firebaseUid: String
  }
  type FollowedUsers {
    firebaseUid: String
  }
  type Socials {
    youtube: YoutubeLink
    spotify: SpotifyLink
    twitter: TwitterLink
  }
  type User {
    id: String
    name: String
    email: String
    bio: String
    socials: Socials
    firebaseUid: String
    photo: String
    banner: String
    onboardingCompleted: Boolean
    feedPreferences: FeedPreferences
    teams: [SmallTeam]
    followedUsers: [FollowedUsers]
  }
  extend type Query {
    user(id: String!): User
    userByFirebaseUid(firebaseUid: String!): User
  }
  extend type Mutation {
    signup(name: String, email: String!, firebaseUid: String!, photo: String): User
    updateProfile(firebaseUid: String!, name: String, email: String, bio: String, userPhoto: String, bannerPhoto: String): User
    updateSocialMedia(firebaseUid: String!, socials: SocialsInput!): User
    updateTeams(firebaseUid: String!, teams: [TeamInput]): User
    updateFollowedUsers(firebaseUid: String!, followedUsers: [FollowedUsersInput]): User
    onboarding(email: String, feedPreferences: FeedPreferencesInput, teams: [TeamInput]): User
  }
`;
