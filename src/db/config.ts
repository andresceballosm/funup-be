import mongoose from 'mongoose';

export const connectDB = () => {
  return new Promise<void>((resolve, _) => {
    mongoose
      .connect(generateDbUrl())
      .then(() => {
        console.log(`Connected to MongoDb in ${process.env.NODE_ENV} environment...`);
        resolve();
      })
      .catch((err) => {
        throw new Error(`Error initializing databse ${err}`);
      });
  });
};

const generateDbUrl = () => {
  let DB: string = process.env.MONGODB_CNN;

  if (process.platform !== 'darwin') {
    if (process.env.MONGODB_CNN) {
      DB = DB.replace('<PASSWORD>', process.env.MONGODB_PASSWORD || '');
      DB = DB.replace('<USER>', process.env.MONGODB_USER || '');
    } else {
      throw new Error('Database ENV vars are not set!');
    }
  } else {
    DB = 'mongodb://localhost:27017/fanalyst_development';
  }

  return DB;
};

export const disconnectDB = () => mongoose.disconnect();
