const request = require('request');

const geoCode = (location, callback) => {

    const geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(location) + '.json?access_token=pk.eyJ1IjoiYXNoaXNobWVobmRpcmF0dGExOTg3IiwiYSI6ImNrY2Vkd2U0czAwZWoycmxtMWdicWZubGEifQ.PQX3q2847surJHsDDvHF0A&limit=1';

    request({ url: geocodingUrl, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services');
        } else if (body.features.length === 0) {
            callback('Unable to find location');
        } else {
            callback(undefined, {
                'place': body.features[0].place_name,
                'longitude': body.features[0].center[1],
                'latitude': body.features[0].center[0]
            })
        }
    })

}

module.exports = geoCode;