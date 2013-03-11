/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , enummers = require('./routes/enummers')
    , facebook = require('./routes/facebook')
    , twitter = require('./routes/twitter')
    , mysql = require('mysql')
    , http = require('http')
    , path = require('path');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/categorieen', enummers.categorieen);
app.get('/soorten', enummers.soorten);
app.get('/enummers', enummers.enummers);
app.get('/effecten', enummers.effecten);
app.get('/enummerseffecten', enummers.enummerseffecten);
app.get('/facebook', facebook.loadPosts);
app.get('/twitter', twitter.loadTweets);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});