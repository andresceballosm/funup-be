import mongoose, { Connection } from 'mongoose';

let fanalystConn: Connection;

const getConnection = () => {
  if (!fanalystConn) {
    try {
      if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
        fanalystConn = mongoose.createConnection(
          `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`
        );
      } else {
        const conn = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`;
        const connOptions = {
          auth: {
            username: process.env.MONGODB_USER,
            password: process.env.MONGODB_PASSWORD,
          },
          authSource: 'admin',
          dbName: process.env.MONGODB_DB,
        };
        fanalystConn = mongoose.createConnection(conn, connOptions);
      }
      fanalystConn.on('connected', () => {
        console.log(`Connected to Fanalyst MongoDb in ${process.env.NODE_ENV} environment...`);
      });
    } catch (error) {
      throw new Error(`Error initializing Fanalyst database ${error}`);
    }
  }

  return fanalystConn;
};

const closeConnection = () => {
  if (fanalystConn) {
    fanalystConn.close();
  }
};

export default {
  getConnection,
  closeConnection,
};
