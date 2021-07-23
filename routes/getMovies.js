'use strict'

const axios = require('axios');


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
        .catch(err => {
            console.log(err)
            res.status(200).send(err.response.status)
        })

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

module.exports = getMovies;