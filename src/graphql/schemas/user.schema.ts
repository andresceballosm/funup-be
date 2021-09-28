import { gql } from 'apollo-server-express';

export const userSchema = gql`
  type User {
    name: String
    email: String
  }
  type Query {
    user(id: String!) : User
  }
  type Mutation {
    signup(name: String!, email: String!, firebaseUid: String!,
      googleToken: String, facebookToken: String,
      twitterToken: String, photo: String) : User
  }
`;