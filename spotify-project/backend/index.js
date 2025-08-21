const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const router = require('./routes/router.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

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