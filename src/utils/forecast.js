const request = require('request');

const weatherInfo = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=b65721badd22aa5fa0b97b639543cf3f&query=' + latitude + ',' + longitude + '&units=f';
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather api');
        }else if( body.error){
            callback('Cannot find weather info. Please Try later');
        }else{
            callback(undefined, body.current)
        }
    })
}

module.exports = {
    weatherInfo: weatherInfo
}