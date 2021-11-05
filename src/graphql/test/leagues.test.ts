import Server from '../../models/server.model';
import { leagueModel } from '../../models/league.model';
import { league } from './factories/leagues';
import { ApolloServer } from 'apollo-server-express';

describe('Leagues graphql', () => {
  let server: Server;
  let apolloServer: ApolloServer;

  beforeAll(() => {
    server = new Server();
    apolloServer = server.createApolloServer();
  });

  beforeEach(async () => {
    await leagueModel.deleteMany({});
  });

  afterAll(async () => {
    await leagueModel.deleteMany({});
    server.stopServer();
  });

  describe('league', () => {
    describe('when leagues query is called', () => {
      it('returns the leagues in db', async () => {
        await leagueModel.create(league);
        const GET_LEAGUES = `
        {
            leagues {
                name
                logo
                teams {
                  name
                  country
                  countryCode
                  abbreviation
                  state
                  logo
                  coverImage
                }
            }
        }
        `;

        const result = await apolloServer.executeOperation({ query: GET_LEAGUES });

        expect(result.errors).toBeUndefined();
        expect(result.data?.leagues[0].name).toBe(league.name);
        expect(result.data?.leagues[0].teams.length).toBe(league.teams.length);
      });
    });
  });
});