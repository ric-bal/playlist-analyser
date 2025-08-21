import express from 'express';
import cors from 'cors';

import pkg from 'body-parser';
const { json, urlencoded } = pkg;

import router from './routes/router.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(json());
app.use(urlencoded({extended:false}));

// use frontend app
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// render client for any path
app.use("/{*any}", (req, res) => res.sendFile(path.join(__dirname, "/frontend/dist/index.html")))

const corsOptions = {
    origins: "https://playlist-analyser.onrender.com",
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use('/', router);

const PORT = 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});