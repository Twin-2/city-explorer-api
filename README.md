
# city-explorer-api


**Author**: David Whitmore
**Version**: 1.0.4 

## Overview
This is the API for a city explorer app. At this point it will only pull weather data for a specific city that it is given. Server deployed on Heroku with UI on [Netlify](https://gracious-elion-ed4167.netlify.app/)

## Getting Started
1. Clone the repo
2. run npm i to get the node modules
3. You will also need to add a .env file with to add access keys for the two third party API's used; [weatherBit](https://www.weatherbit.io/) and [movieDB](https://developers.themoviedb.org/3/getting-started/introduction). 

## Routes
- '/movies' needs a city to searchQuery(any word) phrase paramater in the query to define what movies to look for. sends query to a movie database and returns a list of the top 20 movies based on your search.

- '/weather' needs a lat(latitude) and lon(longitude) passed as query parameters. sends a request to a weather database and returns a 16 day forecast fot the search area. 

## Architecture
This was built with Javascript using Node and Express.

## Change Log
07-20-2021 8:00pm - Server has a route to get weather information from a static local DB.

7-22-2021 8:00pm - Added routes for  live weather updates and a movie list from third party API's.

7-23-2021 6:00pm - Added a server side cache to store searches and increase front end user speed.

7-25-2021 6:00pm - Cleaned up code with modularizing the functions and end routes. No new routes added.

## Credit and Collaborations
Thank you to the Code Fellows TA's for helping me trouble shoot!

# for Code Fellows assignment

## WhiteBoard: 7/20/21


![lab07 - whiteboard](https://user-images.githubusercontent.com/81482156/126547956-6182ff0e-1682-434c-a5c0-3d67b8fcabc0.png)





Name of feature: Set up

Estimate of time needed to complete: 30 minutes

Start time: _____

Finish time: _____

Actual time needed to complete: 15 minutes

Name of feature: Weather placeholder

Estimate of time needed to complete: 1 hour

Start time: _____

Finish time: _____

Actual time needed to complete: ~3 hours

Name of feature: Errors

Estimate of time needed to complete: 1 hour

Start time: _____

Finish time: _____

Actual time needed to complete: ~5 minutes (it turns out I already had this feature working)


## WhiteBoard: 7/21/21
![7-21-21_Whiteboard](https://user-images.githubusercontent.com/81482156/126590553-c8110fb6-3dba-4a64-9baf-951141d8b099.PNG)


## WhiteBoard 7/22/21
![7-22-21 whiteboard](https://user-images.githubusercontent.com/81482156/126852615-99279269-e794-436b-9f03-307a5deb99d0.PNG)

