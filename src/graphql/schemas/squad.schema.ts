import { gql } from 'apollo-server-express';

const userProps = `
  firebaseUid: String
  name: String
  photo: String
`;

export const squadSchema = gql`
  input SmallUserInput {
    firebaseUid: String
    name: String
    photo: String
  }
  type SmallUser {
    ${userProps}
  }
  type Squad {
    id: String
    name: String
    bio: String
    photo: String
    banner: String
    teams: [SmallTeam]
    captain: SmallUser
    members: [SmallUser]
  }
  extend type Query {
    squads: [Squad],
    squadById(id: String!): Squad
  }
  extend type Mutation {
    joinSquad(id: String!, member: SmallUserInput!): Squad
    leaveSquad(id: String!, member: SmallUserInput!): Squad
  }
`;