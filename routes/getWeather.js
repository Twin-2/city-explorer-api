'use strict'

const axios = require('axios')



function getWeather(req,res){
    let lat = req.query.lat;
    let lon = req.query.lon;
    let weatherAPI = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
    
    axios.get(weatherAPI)
        .then(response => { 
            let weatherData = response.data
            let daysArray = weatherData.data.map( (value,idx) => new Forecast(value.datetime, `Temperature of ${value.temp} with ${value.weather.description}`))
            console.log(daysArray)
            res.send(daysArray)
        })
        .catch(err => {
            console.log(err)
            res.status(200).send(err.response.status)
        })

    class Forecast{
        constructor(date, description){
            this.date = date;
            this.description = description;
        }
    }
}



module.exports = getWeather;