import { gql } from 'apollo-server-express';

export const userSchema = gql`
  type User {
    name: String
    email: String
    bio: String
  }

  extend type Query {
    user(id: String!): User
  }

  extend type Mutation {
    signup(name: String, email: String!, firebaseUid: String!, photo: String): User
    updateProfile(id: String!, name: String, email: String, bio: String, photo: String): User
  }
`;
