const gMapsApi = require('@google/maps');

class Photos {

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

            this.googleMapsClient.placesPhoto({
                photoreference: req.query.reference,
                maxwidth: 200,
                maxheight: 200
            }, (err, photo) => {

                if (!err) {
                    resolve(photo);
                } else {
                    reject(err);
                }

            });

        }).then(photo => {
            photo.pipe(res);
        }).catch(e => {
            console.error(e);
        });

    }

}

module.exports = Photos;
