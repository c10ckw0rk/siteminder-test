/*global describe it expect*/
require('dotenv').config();
const Details = require('../../server/routes/Details');

const details = new Details();
describe('Details provides an interface to retrieve details about a google place.', () => {

    it('returns details about a google place.', done => {

        const mock = {
            req: {
                body: {
                    reference: 'ChIJc-mgUVykEmsRsiVGnd44wMI'
                }
            },
            res: {
                json(result) {
                    expect(Object.keys(result)).toEqual([
                        'address_components',
                        'adr_address',
                        'formatted_address',
                        'formatted_phone_number',
                        'geometry',
                        'icon',
                        'id',
                        'international_phone_number',
                        'name',
                        'opening_hours',
                        'photos',
                        'place_id',
                        'rating',
                        'reference',
                        'reviews',
                        'scope',
                        'types',
                        'url',
                        'utc_offset',
                        'vicinity',
                        'website'
                        ]);
                    done();
                }
            }
        };

        details.get(mock.req, mock.res);

    }, 5000);

});
