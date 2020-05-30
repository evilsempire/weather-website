const request = require('request');

const geocode = (address, callback) => {
    let mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZXZpbHNlbXBpcmUiLCJhIjoiY2thbXQxbjB1MDl4NjJzcGZmdnh3YWszZiJ9.KUX_EwYzfwkCuxh65iyqXg&limit=1`;

    request({ url: mapUrl, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to weather service!`)
        } else if (!body.features.length) {
            callback('Unable to locate location')
        } else {
            const longitude = body.features[0].center[0];//longitude
            const lattitude = body.features[0].center[1];//lattitude

            callback(undefined, {
                lattitude: body.features[0].center[1],//lattitude
                longitude: body.features[0].center[0],//longitude,
                location: body.features[0].place_name
            })
        }
    })
};

module.exports = geocode;