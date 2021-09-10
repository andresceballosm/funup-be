import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

// Resolvers
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/schemas';

//CONSTANTS
import pathURL from '../constants/path.constants';
import { dbConnection } from '../db/config';

const path = require('path');

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';
    //Headers
    this.headers();
    //Connection DB
    //this.connectionDB();
    //Middlewares
    this.middlewares();

    if (process.env.NODE_ENV !== 'production') {
      require('dotenv').config();
    }
  }

  headers() {
    this.app.all('/*', function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      next();
    });
  }

  async connectionDB() {
    await dbConnection();
  }

  async middlewares() {
    this.startServer();
    this.app.use(cors());
    this.app.use(express.json());
    //Static files
    this.app.use(express.static(path.join(__dirname, 'public')));
  }


  createApolloServer () {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    return server;
  }

  async startServer() {
    const server = this.createApolloServer();
    await server.start();
    const app = this.app;
    server.applyMiddleware({ app, path: pathURL.graphql });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port ' + this.port);
    });
  }
}

export default Server;
