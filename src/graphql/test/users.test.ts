import Server from '../../models/server.model';
import { userModel } from '../../models/user.model';
import { onboardingMock, socialsMock, user } from './factories/users';
import { ApolloServer } from 'apollo-server-express';

describe('Users graphql', () => {
  let server: Server;
  let apolloServer: ApolloServer;

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
          variables: { id: 1 },
        });

        expect(JSON.parse(JSON.stringify(result.errors))[0].message).toEqual(
          '1 is not a valid user ID'
        );
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
          variables: { id: 1 },
        });

        expect(result.errors).toBeUndefined();
        expect(result.data?.user.name).toEqual(newUser.name);
      });
    });
  });

  describe('userByFirebaseUid', () => {
    const GET_USER_BY_FIREBASEUID = `
        query userByFirebaseUid($firebaseUid: String!) {
          userByFirebaseUid(firebaseUid: $firebaseUid) {
            name
          }
        }
        `;

    describe('when an invalid user firebaseUid is given', () => {
      it('it returns no error but null user data', async () => {
        const result = await apolloServer.executeOperation({
          query: GET_USER_BY_FIREBASEUID,
          variables: { firebaseUid: '1' },
        });

        expect(result.errors).toBeUndefined();
        expect(result.data).toBeDefined();
        expect(result.data?.userByFirebaseUid).toBeNull();
      });
    });

    describe('when an valid user firebaseUid is given', () => {
      it('returns the user object', async () => {
        const newUser = await userModel.create(user);
        const result = await apolloServer.executeOperation({
          query: GET_USER_BY_FIREBASEUID,
          variables: { firebaseUid: user.firebaseUid },
        });

        expect(result.errors).toBeUndefined();
        expect(result.data?.userByFirebaseUid.name).toEqual(newUser.name);
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
          variables: { name: user.name },
        });

        expect(JSON.parse(JSON.stringify(result.errors))[0].message).toEqual(
          'Field "signup" argument "email" of type "String!" is required, but it was not provided.'
        );
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
          variables: user,
        });

        const expectedUser = { name: user.name, email: user.email };

        expect(result.errors).toBeUndefined();
        expect(JSON.stringify(result.data?.signup)).toEqual(JSON.stringify(expectedUser));
      });
    });
  });

  describe('updateProfile', () => {
    describe('when an invalid object is given', () => {
      it('returns a validation error', async () => {
        const UPDATE_PROFILE = `
        mutation {
            updateProfile(randomName: "${user.name}") {
              name
            }
        }
        `;

        const result = await apolloServer.executeOperation({
          query: UPDATE_PROFILE,
          variables: { randomName: user.name },
        });

        expect(JSON.parse(JSON.stringify(result.errors))[0].message).toEqual(
          'Unknown argument "randomName" on field "Mutation.updateProfile".'
        );
      });
    });

    describe('when a valid object is given', () => {
      it('updates the existing user', async () => {
        const newUser = await userModel.create(user);
        const UPDATE_PROFILE = `
        mutation {
            updateProfile(id: "${newUser.id}", bio: "Welcome to my profile") {
              name
              email
              bio
              onboardingCompleted
            }
        }
        `;

        const result = await apolloServer.executeOperation({
          query: UPDATE_PROFILE,
          variables: { bio: 'Welcome to my profile' },
        });

        const expectedUser = {
          name: user.name,
          email: user.email,
          bio: 'Welcome to my profile',
          onboardingCompleted: true,
        };

        expect(result.errors).toBeUndefined();
        expect(JSON.stringify(result.data?.updateProfile)).toEqual(JSON.stringify(expectedUser));
      });
    });
  });

  describe('updateSocials', () => {
    describe('when an invalid object is given', () => {
      it('returns a validation error', async () => {
        const UPDATE_SOCIAL = `
        mutation {
            updateSocialMedia(randomName: "${user.name}") {
              name
            }
        }
        `;

        const result = await apolloServer.executeOperation({
          query: UPDATE_SOCIAL,
          variables: { randomName: user.name },
        });

        expect(JSON.parse(JSON.stringify(result.errors))[0].message).toEqual(
          'Unknown argument "randomName" on field "Mutation.updateSocialMedia".'
        );
      });
    });

    describe('when a valid object is given', () => {
      it('updates the existing user', async () => {
        const newUser = await userModel.create(user);
        const UPDATE_SOCIAL = `
          mutation updateSocialMedia($firebaseUid: String!, $socials: SocialsInput!) {
            updateSocialMedia(firebaseUid: $firebaseUid, socials: $socials) {
              firebaseUid
              socials {
                youtube {
                  channelId
                }
                spotify {
                  podcasts {
                    name
                    description
                    image {
                      url
                      width
                      heigth
                    }
                    id
                  }
                }
              }
            }
          }
        `;

        const expectedUser = {
          firebaseUid: newUser.firebaseUid,
          socials: socialsMock.socials,
        };

        const result = await apolloServer.executeOperation({
          query: UPDATE_SOCIAL,
          variables: {
            firebaseUid: newUser.firebaseUid,
            socials: socialsMock.socials,
          },
        });

        expect(result.errors).toBeUndefined();
        expect(JSON.stringify(result.data?.updateSocialMedia)).toEqual(
          JSON.stringify({ ...expectedUser })
        );
      });
    });
  });

  describe('onboarding', () => {
    describe('when an invalid object is given', () => {
      it('returns a validation error', async () => {
        const ONBOARDING = `
        mutation {
            onboarding(randomName: "${user.name}") {
              name
            }
        }
        `;

        const result = await apolloServer.executeOperation({
          query: ONBOARDING,
          variables: { randomName: user.name },
        });

        expect(JSON.parse(JSON.stringify(result.errors))[0].message).toEqual(
          'Unknown argument "randomName" on field "Mutation.onboarding".'
        );
      });
    });

    describe('when a user is created', () => {
      it('has onboardingComplete in false', async () => {
        const newUser = await userModel.create(user);
        expect(newUser.onboardingCompleted).toBe(false);
      });
    });

    describe('when a valid object is given', () => {
      it('updates the existing user', async () => {
        const newUser = await userModel.create(user);
        const ONBOARDING = `
        mutation onboarding($email: String!, $feedPreferences: FeedPreferencesInput!, $teams: [TeamInput]!){
            onboarding(email: $email, feedPreferences: $feedPreferences, teams: $teams) {
              email
              feedPreferences {
                tweets
                podcasts
                videos
                articles
              }
              teams {
                name
                league
                sportRadarId
                sportsManiaId
              }
              onboardingCompleted
            }
        }
        `;

        const expectedUser = {
          email: newUser.email,
          feedPreferences: onboardingMock.feedPreferences,
          teams: onboardingMock.teams,
        };

        const result = await apolloServer.executeOperation({
          query: ONBOARDING,
          variables: {
            ...expectedUser,
          },
        });

        expect(result.errors).toBeUndefined();
        expect(JSON.stringify(result.data?.onboarding)).toEqual(
          JSON.stringify({ ...expectedUser, onboardingCompleted: false })
        );
      });
    });
  });
});
