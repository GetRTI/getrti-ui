'use strict';

var express = require('express');
var app = express();

// CORS Middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    next();
};
app.configure(function () {
    app.use(allowCrossDomain);
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/../app'));
    app.use(express.bodyParser());
});

app.get('/', express.static(__dirname + '/app/index.html'));

app.post('/login', function(req, res) {
    var out = {
        "username": req.param('username'),
        "password": req.param('password'),
        "message" : "Successfully Logged in."

    }
    res.json(out);
});

app.post('/register', function(req, res) {
    var out = {
        "username": req.param('username'),
        "password": req.param('password'),
        "message" : "Successfully Registered."
    }
    res.json(out);
});

// Should return the information about the existing tags
// may be in the form of {name: 'Department', count: 100}
// Having a count will help us in the visualization, we can
// show the tags with more count in bigger font
app.get('/tags', function(req, res){
    var tags = [
        {"name":"Education", count:100 },
        {"name":"Transport", count:40 },
        {"name":"Health", count:29 },
        {"name":"Water", count:76 },
        {"name":"Security", count:91 },
        {"name":"Agriculture", count:35}
    ];
    res.json(tags);
});

// Return an array of department names
app.get('/departments', function(req,res){
    var departments = ["education", "Agriculture", "Power", "Mining"];
    res.json(departments);
});

app.options("*", function (req, res) {
    res.json({});
});

require('./file.js')(app);

module.exports = app;