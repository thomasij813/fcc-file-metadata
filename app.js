var express = require('express');
var path = require('path');

var indexRoute = require('./routes/index.js');

var app = express();

var port = process.env.PORT || 5000;

app.use('/', indexRoute);

app.listen(port, function() {
    console.log('Listening on port ' + port);
});
