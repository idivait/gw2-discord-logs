// BASE SETUP
// =============================================================================

// call the packages we need
const fs = require('fs');
const https = require('https');
const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');

// call internal modules
const heartbeat = require(__dirname + "/helpers/heartbeat.js");
const port = process.env.PORT || 2556;        // set our port


// Start kick heartbeat
heartbeat();
setInterval(heartbeat, 60 * 5 * 1000);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port);
console.log('Magic happens on port ' + port);