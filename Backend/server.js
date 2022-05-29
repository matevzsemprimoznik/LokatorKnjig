import express from 'express';
import cors from 'cors';
import { createConnection } from './connection.js';
import librariesRoute from './routes/libraries.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use('/libraries', librariesRoute);

app.listen(PORT, () => {
  createConnection();
});
