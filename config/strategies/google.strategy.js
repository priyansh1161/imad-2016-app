var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../../models/user.model');

module.exports = function() {
    passport.use(new GoogleStrategy({
            clientID: "891111513069-j31p2djd1kkpi1o0nl9krhfg4hl630dq.apps.googleusercontent.com",
            clientSecret: "S8bbP2Lpbs3d7Ujp9zAvWr6J",
            callbackURL: "http://vote8er.herokuapp.com/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            // console.log(req ,accessToken , refreshToken , profile , done);
            User.findOne({
                'google.id': profile.id
            }, function(err, user) {
                if (user) {
                    console.log('found')
                    done(null, user);
                } else {
                    console.log('not found');
                    var user = new User({
                        displayName : profile.displayName,
                        img : profile._json.image.url,
                        email : profile.emails[0].value,
                        google : {
                            id: profile.id,
                            token: accessToken
                        }
                    });
                    user.save(user , function(err ,user){
                        if(err){
                            console.log("date base error");
                            done(err);
                        }
                        else{
                            done(null,user);
                        }
                    });
                 
                }
            });

        }
    ));
};