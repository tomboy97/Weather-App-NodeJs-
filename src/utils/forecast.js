const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8d4df18f9efd79a72be1d56603576930&query=' + lat + ',' + long + '&units=m'
    request({ url: url, json: true }, (error,{ body }) => {
        if(error){
            callback('Unable to connect to location services!!',undefined)
        }
        else if(body.error){
            callback('Unable to find the location!!',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out. The humidity is "+body.current.humidity+"%.")
        }
    })
}

module.exports = forecast