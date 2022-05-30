import mongoose from 'mongoose';
import 'dotenv/config';

export const createConnection = async () => {
  try {
    const dbUri = process.env.MONGO_URI;
    const connection = await mongoose.connect(dbUri);
    console.log('Connection successful');
  } catch (error) {
    console.log(error);
  }
};
