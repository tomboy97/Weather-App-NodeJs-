const request = require('request')

const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmFuZGl0YXByYXNhZCIsImEiOiJja2l5cHRsc2IyOWdoMnBzY2d1NzZnenBrIn0.4ZP6bXYcKI1wMJMwXwpu3g&limit=1'
    request({ url: url, json: true }, (error,{body}) => {
        if(error){
            callback('Unable to connect to location services!!',undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location!!!',undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode