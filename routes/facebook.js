/*
 * GET users listing.
 */
var https = require('https');
var $ = require('jquery');
var url = 'https://graph.facebook.com/oauth/access_token?client_id=547621198605534&client_secret=7fe4aed27e8e5c58086f1d318c4ac909&grant_type=client_credentials';

exports.token = function(req, res){

    var options = {
        host: 'graph.facebook.com',
        //port: 443,
        path: '/oauth/access_token?client_id=547621198605534&client_secret=7fe4aed27e8e5c58086f1d318c4ac909&grant_type=client_credentials',
        method: 'GET'
    };
    req.on('end', function () {
        getToken();
        https.get(options, function(resp){
            resp.on('data', function(chunk){
                //do something with chunk
                console.log("Got token: " + chunk);
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });
                var w = {result:chunk.toString()};
                //res.end('__parseJSONPResponse(' + JSON.stringify(rows) + ')');
                res.end(JSON.stringify(w));
            });
        }).on("error", function(e){
                console.log("Got error: " + e.message);
            });
    });
};

exports.loadPosts = function(req, res){
    $.when(getToken()).done(function(token){
        console.log(token);
        $.when(getMessages(token.toString())).done(function(data){
            res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            });
            res.end(JSON.stringify(data));
        }).fail(function(jqXHR, textStatus, errorThrown){
            res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            });
            var obj = {"result":[]};
            res.end(JSON.stringify(obj));
        });
    }).fail(
        function(){
            res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            });
            var obj = {"result":[]};
            res.end(JSON.stringify(obj));
        }
    );
}

var getToken = function(){
    var dfd = $.Deferred(),
    options = {
        host: 'graph.facebook.com',
        path: '/oauth/access_token?client_id=547621198605534&client_secret=7fe4aed27e8e5c58086f1d318c4ac909&grant_type=client_credentials',
        method: 'GET'
    };
    https.get(options, function(res){
        res.on('data', function(data){
            console.log("YOH: " + data);
            dfd.resolve(data);
        });
    }).on("error", function(e){
            console.log("Got error: " + e);
            dfd.reject(e);
    });
    return dfd.promise();
}

var getMessages = function(token){
    var dfd = $.Deferred();
    $.ajax("https://graph.facebook.com/EnummersEnumbers/posts?access_token=547621198605534|sidMXWXYL1Sxuq--wXqLDvPZgHE&callback=?"
    ,{dataType: "jsonp",cache: false,timeout: 5000,success: function(data){
                dfd.resolve(data);
            },
            error: function(jqXHR, textStatus, errorThrown){
                dfd.reject(textStatus);
                console.log(errorThrown);
            }
        }
    );
    return dfd.promise();
}

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