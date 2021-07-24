'use strict';

//dependancies
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const getWeather = require('./routes/getWeather.js');
const getMovies = require('./routes/getMovies.js');

//Server
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);
app.use('*', errorHandler);

function handleGetMovies(req,res){
    const searchQuery = req.query.searchQuery;
    getMovies(searchQuery)
        .then(movieArray => res.send(movieArray))
        .catch(err => console.log(err))
}

function handleGetWeather(req,res){
    let city = req.query.searchQuery
    let lat = req.query.lat;
    let lon = req.query.lon;
    getWeather(city, lat, lon)
        .then(weather => res.send(weather))
        .catch(err => console.log(err))
}

function errorHandler(req, res) {
    res.status(404).send('No Such Route')
}

//Listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
    console.log('server up!', `on port ${process.env.PORT}`)
})