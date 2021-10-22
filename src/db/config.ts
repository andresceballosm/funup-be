import mongoose from 'mongoose';

export const connectDB = () => {
  return new Promise<void>((resolve, _) => {
    if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
      const conn = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`;
      console.log('Connecting to...', conn);
      mongoose
        .connect(conn)
        .then(() => {
          console.log(`Connected to MongoDb in ${process.env.NODE_ENV} environment...`);
          resolve();
        })
        .catch((err) => {
          throw new Error(`Error initializing databse ${err}`);
        });
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
      mongoose
        .connect(conn, connOptions)
        .then(() => {
          console.log(`Connected to MongoDb in ${process.env.NODE_ENV} environment...`);
          resolve();
        })
        .catch((err) => {
          throw new Error(`Error initializing databse ${err}`);
        });
    }
  });
};

export const disconnectDB = () => mongoose.disconnect();
