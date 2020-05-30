const request = require('request');


const forecast = (lattitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c46c16640273ff14ceb8a040bac0cbf0&query=${lattitude},${longitude}`

    request({ url: url, json: true }, (error, { body }) => {

        if (error) {
            callback(`Unable to connect to weather service!`)
        } else if (body.error) {
            callback('Unable to locate location')
        } else {
            callback(``, `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike}. The humidiy is ${body.current.humidity}%.`)
        }
    })
};

module.exports = forecast;