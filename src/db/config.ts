import mongoose from 'mongoose';

export const connectDB = () => {
  return new Promise<void>((resolve, _) => {
    if (process.env.NODE_ENV === 'local') {
      mongoose
        .connect(
          `mongodb://${process.env.MONGODB_HOST}:${process.env.PORT}/${process.env.MONGODB_DB}`
        )
        .then(() => {
          console.log(`Connected to MongoDb in ${process.env.NODE_ENV} environment...`);
          resolve();
        })
        .catch((err) => {
          throw new Error(`Error initializing databse ${err}`);
        });
    } else {
      mongoose
        .connect(`mongodb://${process.env.MONGODB_HOST}`, {
          auth: {
            username: process.env.MONGODB_USER,
            password: process.env.MONGODB_PASSWORD,
          },
          authSource: 'admin',
          dbName: process.env.MONGODB_DB,
        })
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
