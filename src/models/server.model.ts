import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { connectDB, disconnectDB } from '../db/config';
import * as admin from 'firebase-admin';

// Resolvers
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/schemas';

//CONSTANTS
import pathURL from '../constants/path.constants';
import spotifyRouter from '../modules/spotify.module';

const path = require('path');

class Server {
  private app: Application;
  private port: string;
  private server: ApolloServer;

  constructor() {
    this.setEnvVariables();
    //Initialize Firebase before usage
    this.startFirebase();
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
    this.app.use(express.json({limit: '50mb'}));
    //Static files
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(express.urlencoded({ extended: false, limit: '50mb' }));
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
    this.app.use(pathURL.spotify, spotifyRouter);
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

  startFirebase() {
    if (process.env.NODE_ENV !== 'test') {
      const serviceAccount = {
        credential: admin.credential.applicationDefault(),
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientId: process.env.FIREBASE_CLIENT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      };
      admin.initializeApp(serviceAccount);
    }
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
