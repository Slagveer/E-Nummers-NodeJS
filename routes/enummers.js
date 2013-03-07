/*
 * GET users listing.
 */
var mysql = require('mysql');

exports.categorieen = function(req, res){

    var connection = mysql.createConnection({
        user: "root",
        password: "root",//"webdesign",
        database: "enummers",
        host: '127.0.0.1',
        port: '8889'//'3306'
    });
    req.on('end', function () {
        var host = req.headers.host;
        console.log(host);
        if(host == '109.235.76.92:3000' || host == 'localhost:3000' || host == '127.0.0.1:3000'){
            // Query the database.
            connection.query('SELECT * FROM categorieen;', function (error, rows, fields) {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });
                //res.end('__parseJSONPResponse(' + JSON.stringify(rows) + ')');
                res.end(JSON.stringify(rows));
            });
        }
        else{
            res.send("Restriction, sorry!!!" + host);
        }
    });
    //res.send("respond with a resource");
};

exports.soorten = function(req, res){

    var connection = mysql.createConnection({
        user: "root",
        password: "root",//"webdesign",
        database: "enummers",
        host: '127.0.0.1',
        port: '8889'//'3306'
    });
    req.on('end', function () {
        var host = req.headers.host;
        console.log(host);
        if(host == '109.235.76.92:3000' || host == 'localhost:3000' || host == '127.0.0.1:3000'){
            // Query the database.
            connection.query('SELECT * FROM soorten;', function (error, rows, fields) {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });
                //res.end('__parseJSONPResponse(' + JSON.stringify(rows) + ')');
                res.end(JSON.stringify(rows));
            });
        }
        else{
            res.send("Restriction, sorry!!!" + host);
        }
    });
    //res.send("respond with a resource");
};

exports.enummers = function(req, res){

    var connection = mysql.createConnection({
        user: "root",
        password: "root",//"webdesign",
        database: "enummers",
        host: '127.0.0.1',
        port: '8889'//'3306'
    });
    req.on('end', function () {
        var host = req.headers.host;
        console.log(host);
        if(host == '109.235.76.92:3000' || host == 'localhost:3000' || host == '127.0.0.1:3000'){
            // Query the database.
            connection.query('call getAllEnummers()', function (error, rows, fields) {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });
                //res.end('__parseJSONPResponse(' + JSON.stringify(rows) + ')');
                res.end(JSON.stringify(rows));
            });
        }
        else{
            res.send("Restriction, sorry!!!" + host);
        }
    });
    //res.send("respond with a resource");
};

exports.effecten = function(req, res){

    var connection = mysql.createConnection({
        user: "root",
        password: "root",//"webdesign",
        database: "enummers",
        host: '127.0.0.1',
        port: '8889'//'3306'
    });
    req.on('end', function () {
        var host = req.headers.host;
        console.log(host);
        if(host == '109.235.76.92:3000' || host == 'localhost:3000' || host == '127.0.0.1:3000'){
            // Query the database.
            connection.query('SELECT * FROM effecten;', function (error, rows, fields) {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });
                //res.end('__parseJSONPResponse(' + JSON.stringify(rows) + ')');
                res.end(JSON.stringify(rows));
            });
        }
        else{
            res.send("Restriction, sorry!!!" + host);
        }
    });
    //res.send("respond with a resource");
};

exports.enummerseffecten = function(req, res){

    var connection = mysql.createConnection({
        user: "root",
        password: "root",//"webdesign",
        database: "enummers",
        host: '127.0.0.1',
        port: '8889'//'3306'
    });
    req.on('end', function () {
        var host = req.headers.host;
        console.log(host);
        if(host == '109.235.76.92:3000' || host == 'localhost:3000' || host == '127.0.0.1:3000'){
            // Query the database.
            connection.query('SELECT * FROM enummers_effecten;', function (error, rows, fields) {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });
                //res.end('__parseJSONPResponse(' + JSON.stringify(rows) + ')');
                res.end(JSON.stringify(rows));
            });
        }
        else{
            res.send("Restriction, sorry!!!" + host);
        }
    });
    //res.send("respond with a resource");
};