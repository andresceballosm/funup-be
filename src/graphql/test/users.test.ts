import Server from '../../models/server.model';
import { userModel } from '../../models/user.model';
import { user } from './factories/users';
import { ApolloServer } from 'apollo-server-express';

describe('Users graphql', () => {
  let server:Server;
  let apolloServer:ApolloServer;

  beforeAll(() => {
    server = new Server();
    apolloServer = server.createApolloServer();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  afterAll(() => server.stopServer());

  describe('user', () => {
    describe('when an invalid user id is give', () => {
      it('it returns an error message', async () => {
        const GET_USER = `
        {
            user(id: "1") {
                name
            }
        }
        `;

        const result = await apolloServer.executeOperation({
          query: GET_USER,
          variables: { id: 1 }
        });

        expect(JSON.parse(JSON.stringify(result.errors))[0].message).toEqual('1 is not a valid user ID');
        expect(JSON.stringify(result.data?.users)).toBeUndefined();
      });
    });

    describe('when a valid user id is given', () => {
      it('returns the user object', async () => {
        const newUser = await userModel.create(user);
        const GET_USER = `
        {
            user(id: "${newUser._id}") {
                name
            }
        }
        `;

        const result = await apolloServer.executeOperation({
          query: GET_USER,
          variables: { id: 1 }
        });

        expect(result.errors).toBeUndefined();
        expect(result.data?.user.name).toEqual(newUser.name);
      });
    });
  });

  describe('signup', () => {
    describe('when an invalid object is given', () => {
      it('returns a validation error', async () => {
        const CREATE_USER = `
        mutation {
            signup(name: "${user.name}") {
              name
            }
        }
        `;

        const result = await apolloServer.executeOperation({
          query: CREATE_USER,
          variables: { name: user.name }
        });

        expect(JSON.parse(JSON.stringify(result.errors))[0].message)
          .toEqual('Field "signup" argument "email" of type "String!" is required, but it was not provided.');
      });
    });

    describe('when a valid object is given', () => {
      it('returns the new user', async () => {
        const CREATE_USER = `
        mutation {
            signup(name: "${user.name}", email: "${user.email}", firebaseUid: "useruid") {
              name
              email
            }
        }
        `;

        const result = await apolloServer.executeOperation({
          query: CREATE_USER,
          variables: user
        });

        const expectedUser = { name: user.name, email: user.email };

        expect(result.errors).toBeUndefined();
        expect(JSON.stringify(result.data?.signup)).toEqual(JSON.stringify(expectedUser));
      });
    });
  });
});