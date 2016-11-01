var TwitterStrategy = require('passport-twitter').Strategy;
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../../models/user.model');

module.exports = function() {
    passport.use(new TwitterStrategy({
            consumerKey: "z5QR8UZ6Acrb0v6NcJChKgb5b",
            consumerSecret: "ODBF4ISJhPi3eFxzosfOygxHeEBH8wjre5AHgIvccB0CJMKKsY",
            callbackURL: "http://vote8er.herokuapp.com/auth/twitter/callback"
            // passReqtoCallback: true
        },
        function(token, tokenSecret, profile, done) {
            console.log(profile , 'ssss');
            // done(null,profile);
            User.findOne({
                'twitter.id': profile.id
            }, function(err, user) {
                console.log('asfv');
                if (user) {
                    done(null, user);
                } 
                else {
                    var user = new User({

                        displayName: profile.displayName,
                        img: profile.photos[0].value,
                        // email : profile.emails[0].value,// twitter dose not provide emails
                        twitter: {
                            id: profile.id,
                            token: token
                        }
                    });
                    user.save(function(err,user){
                        if(err)
                            done(err);
                        else
                            done(null,user);
                    })
                }
            });
        }
    ));
};