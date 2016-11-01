var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var User = require('../../models/user.model.js');
var mongoose = require('mongoose');

module.exports = function() {
    passport.use(new FacebookStrategy({
            clientID: "296881110654067",
            clientSecret: "e875e4cf41d25faa471bb2713fdebca1",
            callbackURL: "http://vote8er.herokuapp.com/auth/facebook/callback",
            passReqToCallback: true,
            profileFields: ['id', 'email', 'gender', 'link', 'verified', 'displayName','picture'] //graph API v2.6 require these fields or unexpected behaviours are shown . 
        },
        function(req,accessToken, refreshToken, profile, done) {
            console.log(profile._json.picture.data);
            User.findOne({
                'facebook.id': profile.id
            }, function(err, user) {
                if (user) {
                    done(null, user);
                }
                else {
                    var user = new User({
                        displayName: profile.displayName,
                          img : profile._json.picture.data.url,
                         email : profile.emails[0].value, //for some reason fb do not return email in 7/10 cases of this project
                        facebook: {
                            id: profile.id,
                            token: accessToken
                        }
                    });
                    //user.img = 
                    //user.email = 
                    user.save(function(err,user){
                        if(err){
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