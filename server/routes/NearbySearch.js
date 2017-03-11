const gMapsApi = require('@google/maps');

class NearbySearch {

    constructor() {
        this.googleMapsClient = gMapsApi.createClient({
            key: process.env.GOOGLE_API_KEY
        });
    }

    /*
     * @param req {function} - request object from express
     * @param res {function} - response object from express
     */

    get(req, res) {

        new Promise((resolve, reject) => {

            this.googleMapsClient.placesNearby({
                keyword: 'hotel',
                type: 'lodging',
                location: req.body.geocode,
                rankby: 'distance'
            }, (err, results) => {

                if (!err) {
                    resolve(results);
                } else {
                    reject(err);
                }

            });

        }).then(places => {
            res.json(places.json.results.slice(0, 5));
        }).catch(e => {
            console.error(e);
        });

    }

}

module.exports = NearbySearch;
