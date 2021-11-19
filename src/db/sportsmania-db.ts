import mongoose, { Connection } from 'mongoose';

let sportsmaniasConn: Connection;

const getConnection = () => {
  if (!sportsmaniasConn) {
    try {
      if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
        sportsmaniasConn = mongoose.createConnection(
          `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.SPORTSMANIAS_MONGODB_DB}`
        );
      } else {
        const conn = `mongodb://${process.env.SPORTSMANIAS_MONGODB_HOST}:${process.env.SPORTSMANIAS_MONGODB_PORT}`;
        const connOptions = {
          auth: {
            username: process.env.SPORTSMANIAS_MONGODB_USER,
            password: process.env.SPORTSMANIAS_MONGODB_PASSWORD,
          },
          authSource: 'admin',
          dbName: process.env.SPORTSMANIAS_MONGODB_DB,
        };
        sportsmaniasConn = mongoose.createConnection(conn, connOptions);
      }
      sportsmaniasConn.on('connected', () => {
        console.log(`Connected to Sportsmania MongoDb in ${process.env.NODE_ENV} environment...`);
      });
    } catch (error) {
      throw new Error(`Error initializing Sportsmania databse ${error}`);
    }
  }

  return sportsmaniasConn;
};

const closeConnection = () => {
  if (sportsmaniasConn) {
    sportsmaniasConn.close();
  }
};

export default {
  getConnection,
  closeConnection,
};
