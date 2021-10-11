import mongoose from 'mongoose';

export const connectDB = () => {
    return new Promise<void>((resolve, _) => {
        mongoose.connect(generateDbUrl())
          .then(() => {
              console.log(`Connected to MongoDb in ${process.env.NODE_ENV} environment...`);
              resolve();
           })
          .catch((err) => { throw new Error(`Error initializing databse ${err}`) });
    });
};

const generateDbUrl = () => {
    let DB:string;

    if (process.platform !== 'darwin') {
        if (process.env.MONGODB_CNN) {
            DB = process.env.MONGODB_CNN.replace(
                '<PASSWORD>',
                process.env.PASSWORD || ''
            );
            DB = process.env.MONGODB_CNN.replace(
                '<USER>',
                process.env.USER || ''
            );
        } else {
            throw new Error('Database ENV vars are not set!');
        }
    } else {
        DB = 'mongodb://localhost:27017/fanalyst_development';
    }

    return DB;
}

export const disconnectDB = () => mongoose.disconnect();