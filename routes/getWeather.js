'use strict'

const axios = require('axios')
const cache = require('./cache');



function getWeather(city, lat, lon){
    let weatherAPI = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
    const key = 'weather-'+city
    if(!cache[key]){
        cache[key] = {}
        cache[key].timestamp = Date.now();
        cache[key].data = axios.get(weatherAPI)
            .then(response => { 
                let weatherData = response.data
                let daysArray = weatherData.data.map( (value) => new Forecast(value.datetime, `Temperature of ${value.temp} with ${value.weather.description}`))
                return daysArray
            })
    }
    console.log(cache)
    return cache[key].data
    
}


class Forecast{
    constructor(date, description){
        this.date = date;
        this.description = description;
    }
}


module.exports = getWeather;