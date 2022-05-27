import express from 'express';
import cors from 'cors';
import { createConnection } from './connection.js';
import 'dotenv/config';
const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.listen(PORT, () => {
  createConnection();
});
