import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { connectDB, disconnectDB } from '../db/config';

// Resolvers
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/schemas';

//CONSTANTS
import pathURL from '../constants/path.constants';

const path = require('path');

class Server {
  private app: Application;
  private port: string;
  private server: ApolloServer;

  constructor() {
    this.setEnvVariables();
    this.app = express();
    this.port = process.env.PORT || '8000';
    this.server = this.createApolloServer();
    //Headers
    this.headers();
    //Connection DB
    connectDB();
    //Middlewares
    this.middlewares();
  }

  headers() {
    this.app.all('/*', function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      next();
    });
  }

  async middlewares() {
    this.startServer();
    this.app.use(cors());
    this.app.use(express.json());
    //Static files
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  createApolloServer() {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    return server;
  }

  async startServer() {
    this.server = this.createApolloServer();
    await this.server.start();
    const app = this.app;
    this.app.get(pathURL.health, (_, res: any) => res.status(200).json({ status: 'success' }));
    this.server.applyMiddleware({ app, path: pathURL.graphql });
  }

  async stopServer() {
    await this.server.stop();
    disconnectDB();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port ' + this.port);
    });
  }

  setEnvVariables() {
    switch (process.env.NODE_ENV) {
      case 'dev': {
        require('dotenv').config({ path: '.env.dev' });
        break;
      }
      case 'qa': {
        require('dotenv').config({ path: '.env.qa' });
        break;
      }
      case 'local': {
        require('dotenv').config({ path: '.env.local' });
        break;
      }
      default:
        require('dotenv').config({ path: '.env.local' });
    }
  }
}

export default Server;
