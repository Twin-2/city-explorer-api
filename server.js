'use strict';

//dependancies
const express = require('express');
const dotenv = require('dotenv');
const weatherData = require('./data/weather.json');
const cors = require('cors');
const { request } = require('express');

//Server
const app = express();
dotenv.config();
app.use(cors());




// Routes
app.get('/weather', (req, res) => {
    let searchQuery = req.query.searchQuery;
    let data = weatherData.find(value => value.city_name === searchQuery)
    class Forecast{
        constructor(date, description){
            this.date = date;
            this.description = description;
        }
    }

    let daysArray = []; 
    data.data.map( (value,idx) => {
    daysArray.push(new Forecast(value.datetime, `Low of ${value.low_temp}, high of ${value.high_temp} with ${value.weather.description}`))
    })

    res.send(daysArray);
    
})


//Listen
app.listen(process.env.PORT, ()=> {
    console.log('server up!', `on port ${process.env.PORT}`)
})