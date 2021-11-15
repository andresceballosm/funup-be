import { gql } from 'apollo-server-express';

export const leagueSchema = gql`
  type Team {
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
  }
  extend type Mutation {
    populateLeagues: ID
  }
`;
