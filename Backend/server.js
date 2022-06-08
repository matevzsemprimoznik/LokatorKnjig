import express from 'express';
import cors from 'cors';
import {createConnection} from './connection.js';
import librariesRoute from './routes/libraries.js';
import udkRoute from './routes/librariesUDK.js';
import editorRoute from './routes/editor.js';
import 'dotenv/config';


const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json({
    limit: '50mb'
}));

app.use('/libraries', librariesRoute);
app.use('/udk', udkRoute);
app.use('/editor', editorRoute);

app.listen(PORT, () => {
    createConnection();
});
