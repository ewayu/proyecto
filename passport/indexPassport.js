//var express = require("express");
var passport =require('passport');
//var app = express();

var passportconfig=function (server) {
    server.use(passport.initialize());
    server.use(passport.session());

    passport.serializeUser(function(user,done){
        done(null,user);
    });
    passport.deserializeUser(function(user,done){
        done(null,user);
    });
};

module.exports=passportconfig;