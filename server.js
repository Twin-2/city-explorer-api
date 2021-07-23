'use strict';

//dependancies
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const getWeather = require('./routes/getWeather.js')
const getMovies = require('./routes/getMovies.js')

//Server
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.get('/weather', getWeather);
app.get('/movies', getMovies);


//Listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
    console.log('server up!', `on port ${process.env.PORT}`)
})