import { gql } from 'apollo-server-express';

export const leagueSchema = gql`
  type Team {
    sportRadarId: String
    id: String
    name: String
    country: String
    countryCode: String
    abbreviation: String
    state: String
    logo: String
    coverImage: String
  }
  type League {
    name: String
    logo: String
    teams: [Team]
  }
  extend type Query {
    leagues: [League]
    teamById(leagueName: String!, sportRadarId: String!): Team
  }
  extend type Mutation {
    populateLeagues: ID
  }
`;
