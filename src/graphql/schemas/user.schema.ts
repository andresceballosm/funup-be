import { gql } from 'apollo-server-express';

export const userSchema = gql`
  type User {
    name: String
    email: String
    bio: String
  }

  type Query {
    user(id: String!) : User
  }

  type Mutation {
    signup(name: String, email: String!, firebaseUid: String!, photo: String) : User
  }

  type Mutation {
    updateProfile(id: String!, name: String, email: String, bio:String, photo: String) : User
  }
`;