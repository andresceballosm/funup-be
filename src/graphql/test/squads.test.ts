import Server from '../../models/server.model';
import { ApolloServer } from 'apollo-server-express';
import { squad } from './factories/squads';
import { smallUser } from './factories/users';
import _ from 'lodash';
import { getDatabase } from '../../db';

describe('Users graphql', () => {
  let server: Server;
  let apolloServer: ApolloServer;

  beforeAll(() => {
    server = new Server();
    apolloServer = server.createApolloServer();
  });

  afterEach(async () => {
    await getDatabase().userModel.deleteMany({});
    await getDatabase().squadModel.deleteMany({});
  });

  afterAll(() => {
    server.stopServer();
  });

  describe('squads', () => {
    describe('squads', () => {
      it('returns a collection of squads', async () => {
        const newSquad = await getDatabase().squadModel.create(squad);
        const GET_SQUADS = `
          {
            squads {
              name
            }
          }
        `;
        const result = await apolloServer.executeOperation({ query: GET_SQUADS });

        expect(result.errors).toBeUndefined();
        expect(result.data?.squads.length).toBeGreaterThan(0);
        expect(result.data?.squads[0].name).toEqual(newSquad.name);
      });
    });

    describe('squadById', () => {
      describe('when an invalid squad id is given', () => {
        it('returns an error message', async () => {
          const GET_SQUAD = `
            query squadById($id: String!) {
              squadById(id: $id) {
                name
              }
            }
          `;

          const result = await apolloServer.executeOperation({
            query: GET_SQUAD,
            variables: { id: '1' },
          });

          expect(JSON.parse(JSON.stringify(result.errors))[0].message).toEqual(
            '1 is not a valid ID'
          );
          expect(result.data?.squadById).toBeNull();
        });
      });

      describe('when a valid squad id is given', () => {
        it('returns the squad by the given id', async () => {
          const newSquad = await getDatabase().squadModel.create(squad);
          const GET_SQUAD = `
          query squadById($id: String!) {
              squadById(id: $id) {
              name
              captain {
                  name
                  firebaseUid
              }
              }
          }
          `;

          const expectedSquad = {
            name: newSquad.name,
            captain: {
              name: newSquad.captain.name,
              firebaseUid: newSquad.captain.firebaseUid,
            },
          };

          const result = await apolloServer.executeOperation({
            query: GET_SQUAD,
            variables: { id: newSquad.id },
          });

          expect(result.errors).toBeUndefined();
          expect(JSON.stringify(result.data?.squadById)).toEqual(
            JSON.stringify({ ...expectedSquad })
          );
        });
      });
    });

    describe('join', () => {
      describe('when user is not part of the squad', () => {
        it('adds the user to the given squad', async () => {
          const squadWithNoMembers = _.pick(squad, ['name', 'bio', 'teams', 'captain']);
          const newSquad = await getDatabase().squadModel.create(squadWithNoMembers);
          const JOIN_SQUAD = `
            mutation joinSquad($id: String!, $member: SmallUserInput!) {
              joinSquad(id: $id, member: $member) {
                name
                members {
                  name
                }
              }
            }
          `;

          const result = await apolloServer.executeOperation({
            query: JOIN_SQUAD,
            variables: {
              id: newSquad.id,
              member: { ...squad.members[0] },
            },
          });

          expect(result.errors).toBeUndefined();
          expect(result.data?.joinSquad.members[0].name).toEqual(smallUser.name);
        });
      });

      describe('when user is part of the squad', () => {
        it('does NOT add the user to the given squad', async () => {
          const newSquad = await getDatabase().squadModel.create(squad);
          const JOIN_SQUAD = `
            mutation joinSquad($id: String!, $member: SmallUserInput!) {
              joinSquad(id: $id, member: $member) {
                name
                members {
                  name
                }
              }
            }
          `;

          const result = await apolloServer.executeOperation({
            query: JOIN_SQUAD,
            variables: {
              id: newSquad.id,
              member: { ...squad.members[0] },
            },
          });

          expect(result.errors).toBeUndefined();
          expect(result.data?.joinSquad).toBeNull();
        });
      });
    });

    describe('leave', () => {
      it('removes the user of the given squad', async () => {
        const newSquad = await getDatabase().squadModel.create(squad);
        const LEAVE_SQUAD = `
          mutation leaveSquad($id: String!, $member: SmallUserInput!) {
            leaveSquad(id: $id, member: $member) {
              name
              members {
                name
              }
            }
          }
        `;

        const result = await apolloServer.executeOperation({
          query: LEAVE_SQUAD,
          variables: {
            id: newSquad.id,
            member: { ...squad.members[0] },
          },
        });

        expect(result.errors).toBeUndefined();
        expect(result.data?.leaveSquad.members).toEqual([]);
      });
    });
  });
});
