const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    var apiKey = 'AIzaSyAjKVL0P-26C6Qw8TpcK4fskV8gr-alvxE';
    var requestObject = {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
        json: true,
        method: 'GET'
    }
    var callbackArrowFunction = (error, response, body) => {
        if (error) {
            console.log(JSON.stringify(error, undefined, 2));
            callback('Unable to reach servers');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to get location for that address');
        } else if (body.status === 'OK') {
            var result = {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            };
            callback(undefined, result);
        }
    };
    request(requestObject, callbackArrowFunction);
};

module.exports.geocodeAddress = geocodeAddress;
