var passport=require('passport'),
    facebook=require('passport-facebook');

var facebookConfig=function(server){
    passport.use(new facebook({
        clientID: '2168531836740582',
        clientSecret: '694fee775e2c5ca85ffc8391b67cafa1',
        callbackURL: '/auth/facebook/callback'
    },
    function(accesToken, refreshToken,profile, done){
        //profile todos los datos q pueden venir de facebook
        console.log(profile);
    }
));
server.get('/auth/facebook/',passport.authenticate('facebook'));
server.get('/auth/facebook/callback/',passport.authenticate('facebook',
                                        {successRedirect:'/',
                                         failureRedirect:'/login'   }));
    
};

module.exports=facebookConfig;