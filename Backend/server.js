import express from 'express';
import cors from 'cors';
import { createConnection } from './connection.js';
import librariesRoute from './routes/libraries.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || null;


const app = express();

app.use(cors());

app.use('/libraries', librariesRoute);

app.get('/', (req, res) => {
  return res.json('test' + MONGO_URI)
})

app.listen(PORT, () => {
  createConnection();
});
