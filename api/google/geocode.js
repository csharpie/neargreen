var Geocode = (function() {

    // declare private variables and/or functions
    var apiKey = process.env.GOOGLE_MAPS_API_KEY;
    var googleMapsClient = require('@google/maps').createClient({
        key: apiKey
    });

    return {
      // declare public variables and/or functions
      getByAddress: function (req, res) {
        googleMapsClient.geocode({
            address: req.body.address
        }, function(err, response) {
            if (!err && response.json.status == 'OK') {
                res.end(JSON.stringify(response));
            }
        });
      }
    }

})();

module.exports = Geocode