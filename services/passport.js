const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GOOGLE_KEYS = require('../config/keys').GOOGLE_KEYS;
const FACEBOOK_KEYS = require('../config/keys').FACEBOOK_KEYS;
const {User} = require('../models');
const {userOrm} = require('../db');

// set up passport to use the GoogleStrategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_KEYS.clientID,
    clientSecret: GOOGLE_KEYS.clientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {

    const sessionInfo = userOrm.deconstructPassportProfile(profile);
    // call findOrCreate method from userORM

    userOrm.findOrCreate(sessionInfo).then(user => {
        done(null, user);
    }).catch(err => {
        done(null, err);
    });
}));

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_KEYS.clientID,
    clientSecret: FACEBOOK_KEYS.clientSecret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, done) => {
    const sessionInfo = userOrm.deconstructPassportProfile(profile);
    userOrm.findOrCreate(sessionInfo).then(user => {
        done(null, user);
    }).catch(err => {
        done(null, err);
    });
}));

passport.use(new LocalStrategy((email, password, done) => {
    User.findOne({ email }).then(user => {
        if (!user) {
            return done(null, false, {message: 'Incorrect username.'});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
    }).catch(err => {
        return done(err);
    });
}));
