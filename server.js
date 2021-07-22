'use strict';

//dependancies
const express = require('express');
const dotenv = require('dotenv');
const weatherData = require('./data/weather.json');
const cors = require('cors');
// const { request, response } = require('express');
const axios = require('axios');

//Server
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;



// Routes
app.get('/weather', getWeather);
app.get('/movies', getMovies);
    
function getWeather(req,res){
    let lat = req.query.lat;
    let lon = req.query.lon;
    let weatherAPI = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
    
    axios.get(weatherAPI)
        .then(response => { 
            let weatherData = response.data
            let daysArray = []; 
            weatherData.data.map( (value,idx) => {
            daysArray.push(new Forecast(value.datetime, `Temperature of ${value.temp} with ${value.weather.description}`))
            })
            console.log(daysArray)
            res.send(daysArray)
        })
        .catch(err => console.log(err))  
    class Forecast{
        constructor(date, description){
            this.date = date;
            this.description = description;
        }
    }
}




function getMovies(req, res)  {
    let searchQuery = req.query.searchQuery
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchQuery}&page=1&region=${searchQuery}`
    axios.get(url)
        .then(response => {
            let movieData = response.data.results
            let sortedMovieData = movieData.sort((a,b) => b.popularity - a.popularity)
            console.log(sortedMovieData)
            let movies = []
            for(let i=0; i<20; i++){
                movies.push(new Movie(sortedMovieData[i].title, sortedMovieData[i].overview, sortedMovieData[i].vote_count, sortedMovieData[i].poster_path, sortedMovieData[i].popularity, sortedMovieData[i].release_date))
            }
            console.log(movies.length)
            res.send(movies)
        })
        .catch(err => console.log(err))

    class Movie{
        constructor(title, overview, votes, imageUrl, popularity, releasedOn){
            this.title = title;
            this.overview = overview;
            this.votes = votes;
            this.imageUrl = imageUrl;
            this.popularity = popularity;
            this.releasedOn = releasedOn;
        }
    }
}



//Listen
app.listen(PORT, ()=> {
    console.log('server up!', `on port ${process.env.PORT}`)
})