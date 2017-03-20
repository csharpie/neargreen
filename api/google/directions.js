var Directions      = (function () { 
    var apiKey = process.env.GOOGLE_MAPS_API_KEY;
    var googleMapsClient = require('@google/maps').createClient({
        key: apiKey
    });
    var travelModes     = [ "BICYCLING", "TRANSIT", "WALKING" ];

    return {
        getByOriginAndDestination: function (req, res) {
            console.log(JSON.parse(req.body));
            googleMapsClient.directions({
                origin: req.body.origin,
                destination: req.body.destination,
                mode: travelModes[2],
                alternatives: true
            }, function(err, response) {
                console.log(err);
                if (!err && response.status === 200) {
                    return response.json.results;
                } else {
                    console.log(err);
                }
            });
        },
        getByOriginAndDestinationByBiking: function (req, res) {
            googleMapsClient.directions({
                origin: req.origin,
                destination: res.destination,
                mode: travelModes[0],
                alternatives: true
            })
        },
        getByOriginAndDestinationByTransit: function (req, res) {
            googleMapsClient.directions({
                origin: req.origin,
                destination: res.destination,
                mode: travelModes[1],
                alternatives: true,
                transit_mode: ['bus', 'rail'],
                transit_routing_preference: 'fewer_transfers'
            })
        }
    }
}());

module.exports = Directions;