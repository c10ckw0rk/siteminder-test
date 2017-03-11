const gMapsApi = require('@google/maps');

class Details {

    constructor() {
        this.googleMapsClient = gMapsApi.createClient({
            key: process.env.GOOGLE_API_KEY
        });
    }

    /*
     * @param suburb {string}
     * @param state {string}
     * @param service {string}
     * @param callback {function}
     */

    get(req, res) {

        new Promise((resolve, reject) => {

            this.googleMapsClient.place({placeid: req.body.reference, language: 'au'}, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });

        }).then(result => {
            res.json(result.json.result);
        }).catch(e => {
            console.error(e);
        });

    }

}

module.exports = Details;
