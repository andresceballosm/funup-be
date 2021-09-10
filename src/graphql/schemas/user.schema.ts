import { gql } from 'apollo-server-express';

export const userSchema = gql`
  type User {
    name: String
  }
  type Query {
    users: [User]
  }
`;
