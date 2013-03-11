/*
 * GET users listing.
 */
var https = require('https');
var $ = require('jquery');

exports.loadTweets = function(req, res){
    $.when(getTweets()).done(function(data){
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });
        //console.log(data);
        var result = [];
        for(var i=0,l = data.results.length; i<l;i++){
            //console.log(data.data[i]);
            result.push(data.results[i]);
        }
        res.end(JSON.stringify(result));
    }).fail(function(jqXHR, textStatus, errorThrown){
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });
        var obj = {"result":[]};
        res.end(JSON.stringify(obj));
    });
}

var getTweets = function(){
    var dfd = $.Deferred();
    $.ajax("http://search.twitter.com/search.json?q=%40e-nummers&rpp=100&result_type=recent&lang=nl&callback=?"
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