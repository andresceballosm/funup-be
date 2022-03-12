import express, { Application } from 'express';
import cors from 'cors';

//ROUTES
import base_routes from '../routes/base.routes';
import user_routes from '../routes/user.routes';
import role_routes from '../routes/role.routes';
import auth_routes from '../routes/auth.routes';
import client_routes from '../routes/client.routes';

//CONSTANTS
import pathURL from '../constants/path.constants';

// DB
import { connectDB } from '../db/config';

const path = require('path');
const expbhs  = require('express-handlebars');

class Server {
  private app: Application;
  private port: string;
  private apiPaths = pathURL;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.setEnvVariables()
    //Views
    this.views();
    //Headers
    this.headers();
    //DB
    this.dbConnection()
    //Middlewares
    this.middlewares();
    //Define routes
    this.routes();

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

  async dbConnection() {
    await connectDB()
  }

  routes() {
    this.app.use(this.apiPaths.base, base_routes);
    this.app.use(this.apiPaths.auth, auth_routes);
    this.app.use( this.apiPaths.users, user_routes);
    this.app.use(this.apiPaths.roles, role_routes);
    this.app.use(this.apiPaths.clients, client_routes);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    //Static files
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  views() {
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.engine(
      '.hbs',
      expbhs({
        defaultLayout: 'main',
        layoutsDir: path.join(this.app.get('views'), 'layouts'),
        partialsDir: path.join(this.app.get('views'), 'partials'),
        extname: '.hbs',
      })
    );

    this.app.set('view engine', '.hbs');
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto ' + this.port);
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
