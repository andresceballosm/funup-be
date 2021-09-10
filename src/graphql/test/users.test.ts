import Server from '../../models/server.model';
import { mockUsers } from '../../mocks/users.mock';

describe('Users graphql', () => {

  it('read a list of users name', async () => {
    const server = new Server();
    const createServer = server.createApolloServer();
    // graphl query
    const GET_USERS = `
    {
        users {
            name
        }
    }
    `;

    const result = await createServer.executeOperation({
      query: GET_USERS,
      variables: { id: 1 }
    });

    expect(result.errors).toBeUndefined();
    expect(JSON.stringify(result.data?.users)).toBe(JSON.stringify(mockUsers));

    // const response = await query({ query: GET_USERS });
    // expect(result.data.users).toEqual(mockUsers);
  });
});
