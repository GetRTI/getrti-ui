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
app.get('/api/host/user', function (req, res) {
    
    var out = 
    {
        "identity": {
            "userId": "Siteminder is not configured",
            "userName": "Platform@USAuto",
            "enterprise": "USAuto",
            "actor": "Platform@USAuto",
            "isAuthenticated": false,
            "roles": [],
            "authenticationType": "IAM"
        },
        "applications": {}
    }
    res.json(out);
});

app.get('/admin-services/ee', function (req, res) {
    
    var out = {
        "totalNumberOfEnterprises":5521,
        "enterpriseSummary":[
            {"id":"E104830","code":null,"name":"#1 COCHRAN INC","addresses":{}},
            {"id":"E104860","code":null,"name":"#1 COCHRAN INC","addresses":{}},
            {"id":"E100188","code":null,"name":"#1 COCHRAN INC","addresses":{}},
            {"id":"E100543","code":null,"name":"5 CORNERS DODGE","addresses":{}},
            {"id":"E103459","code":null,"name":"5 Corners GMC Truck","addresses":{}},
            {"id":"E106071","code":null,"name":"500 Automotive Chevrolet Buick GMC","addresses":{}},
            {"id":"E104835","code":null,"name":"A CRIVELLI CHEVROLET-SUBARU","addresses":{}},
            {"id":"E100028","code":null,"name":"A+ AUTO BROKERS INC","addresses":{}},
            {"id":"E105017","code":null,"name":"A+ AUTO BROKERS INC","addresses":{}},
            {"id":"E103600","code":null,"name":"A-1 Toyota","addresses":{}}
        ]}
    res.json(out);
});

app.get('/admin-services/e/:id', function (req, res) {
    
    var out = {
        "id":"E104860",
        "code":null,
        "name":"#1 COCHRAN INC",
        "addresses":{},
        "cmfNumber":null,
        "email":"mockedEmail@email.com",
        "mainPhone":"888 888 8888",
        "helpDeskPhone":"888 888 8888",
        "fax":"888 888 8888",
        "keyContacts":[
            {"firstName":"Fritz","lastName":"Padula","contactType":"Marketing","phone":"6569786567","email":"fritz.padula@gmail.com"},
            {"firstName":"Cristobal","lastName":"Nolen","contactType":"Mechanic","phone":"5497846927","email":"cristobal.nolen@gmail.com"},
            {"firstName":"Clementina","lastName":"Kothari","contactType":"Mechanic","phone":"1447214225","email":"clementina.kothari@gmail.com"}
        ]
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