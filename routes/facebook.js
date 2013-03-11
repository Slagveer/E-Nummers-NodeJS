/*
 * GET users listing.
 */
var https = require('https');
var $ = require('jquery');
var arrayResult = [];

exports.loadPosts = function(req, res){
    $.when(getToken()).done(function(token){
        //console.log(token);
        $.when(getPages(token.toString())).done(function(data){
            var pages = data.data,l = data.data.length,ajaxItemsDefered = [];
            for(var i = 0;i<l;i++){
                //console.log(pages[i].id + " " + pages[i].name);
                if(pages[i].id.split("110833495662026").length === 1){
                    ajaxItemsDefered.push(getMessages(token.toString(),pages[i]));
                }
            }
            $.when.apply($, ajaxItemsDefered).then(function(){
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });
                res.end(JSON.stringify(arrayResult));
            }).fail(function(jqXHR, textStatus, errorThrown){
                    res.writeHead(200, {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    });
                    var obj = {"result":[]};
                    res.end(JSON.stringify(obj));
                });
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
            //console.log("YOH: " + data);
            dfd.resolve(data);
        });
    }).on("error", function(e){
            console.log("Got error: " + e);
            dfd.reject(e);
    });
    return dfd.promise();
}

var getMessages = function(token,data){
    var dfd = $.Deferred();
    $.ajax("https://graph.facebook.com/" + data.id + "/posts?" + token + "&callback=?"
    ,{dataType: "jsonp",cache: false,timeout: 5000,success: function(data){
                var messages = data.data,l = data.data.length;
                for(var i=0; i<l;i++){
                    //console.log(messages[i]);
                    if(messages[i].message && messages[i].type !== "photo"){
                        arrayResult.push(messages[i]);
                    }
                }
                dfd.resolve(arrayResult);
            },
            error: function(jqXHR, textStatus, errorThrown){
                dfd.reject(textStatus);
                console.log(errorThrown);
            }
        }
    );
    return dfd.promise();
}

var getPages = function(token){
    var dfd = $.Deferred();
    $.ajax("https://graph.facebook.com/search?q=enummer&type=page&" + token + "&callback=?"
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
