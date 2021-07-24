'use strict'

const axios = require('axios');
const { response } = require('express');
const cache = require('./cache');


function getMovies(searchQuery)  {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchQuery}&page=1&region=${searchQuery}`;
    const key = 'movies-'+searchQuery;
    if(!cache[key]){
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = axios.get(url)
            .then(response => {
                let movieData = response.data.results
                let moviesArray = formatMovieData(movieData);
                return moviesArray
            })
    }
    return cache[key].data
}

function formatMovieData(data) {
    let sortedMovieData = data.sort((a,b) => b.popularity - a.popularity)
    let movies = [];
    for(let i=0; i<20; i++){
        movies.push(new Movie(sortedMovieData[i]))
    }
    return movies
}

class Movie{
    constructor(obj){
        this.title = obj.title;
        this.overview = obj.overview;
        this.votes = obj.votes_count;
        this.imageUrl = obj.poster_path;
        this.popularity = obj.popularity;
        this.releasedOn = obj.release_date;
    }
}

module.exports = getMovies; 