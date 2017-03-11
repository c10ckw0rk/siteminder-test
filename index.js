/* Set enviroment */
process.env.VUE_ENV = 'server';
require('pretty-error').start();
require('dotenv').config();

/* Import it all!*/
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const path = require('path');

const StreamRenderer = require('./lib/server/stream-render');
const NearBy = require('./server/routes/NearbySearch');
const Photos = require('./server/routes/Photos');
const Details = require('./server/routes/Details');

//Setup
const app = express();
const streamRenderer = new StreamRenderer(app);
const nearby = new NearBy();
const photo = new Photos();
const details = new Details();

app.use(favicon(path.resolve(__dirname, './assets/favicon-16x16.png')));
app.use('/public', express.static(path.resolve(__dirname, './server/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//api end points
app.post('/gethotels', (req, res) => {
    nearby.get(req, res);
});

app.post('/getdetails', (req, res) => {
    details.get(req, res);
});

app.get('/getphoto', (req, res) => {
    photo.get(req, res);
});

//catch all vue
app.get('*', (req, res) => { // usually would be more specific adding in a 404 etc..
    streamRenderer.route(req, res);
});

app.listen(process.env.PORT, () => {
    console.log('App started');
});
