import express from 'express';
import cors from 'cors';

import pkg from 'body-parser';
const { json, urlencoded } = pkg;

import router from './routes/router.js';
import path from 'path';
import { fileURLToPath } from 'url';
const PORT = process.env.PORT || 4000; // render.com has default env variable called PORT

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(json());
app.use(urlencoded({extended:false}));

// use frontend app [a]
app.use(express.static(path.join(__dirname, "/frontend/dist")));

const corsOptions = {
    origins: 'https://playlist-analyser.onrender.com', // 'https://playlist-analyser.onrender.com', 
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use('/', router);

// render client for any path [b]
app.use("/{*any}", (req, res) => res.sendFile(path.join(__dirname, "/frontend/dist/index.html")))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});



/* 

For prod:
1. uncomment code labelled with [a] and [b] in index.js
2. set axios.get() url from "http://localhost:4000/api/get_[]" to "/api/get_[]" in getPlaylist and getArtist
3. run 'npm run build' in frontend

For dev, reverse steps 1 and 2 

backend - 'npm start'
frontend - 'npm run dev'


*/
