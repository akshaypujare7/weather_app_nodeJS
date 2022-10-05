const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=cf4ed0f28c59110be52f72014d20afc8&query=' + latitude + ','+ longitude

    request({ url, json:true }, (error, {body})=> {
        if(error){
            callback("Unable to connect to weather service!")
        } else if (body.error){
            callback("Unable to find location")
        } else {
            callback(undefined,body.current.weather_descriptions+".It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out")
        }
    })
}

module.exports = forecast