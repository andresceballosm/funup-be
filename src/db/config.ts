import mongoose from 'mongoose';

export const connectDB = () => {
    const DB = process.env.MONGODB_CNN || '';
    return new Promise<void>((resolve, _) => {
        mongoose.connect(DB)
          .then(() => {
              console.log(`Connected to MongoDb in ${process.env.NODE_ENV} environment...`);
              resolve();
           })
          .catch((err) => { throw new Error(`Error initializing databse ${err}`) });
    });
};

export const disconnectDB = () => mongoose.disconnect();