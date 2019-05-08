const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const db = require('../models')
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.
passport.serializeUser(function(user, done) {
  // console.log("passport serializeUser user", user)
  console.log("passport.js serializeUser user.id", user.id)
  const id = user.id
	done(null, id);
});

passport.deserializeUser( async function(id, done) {
  console.log("passport.js deserializeUser id", id)
  user = await db.User.findById( id );
	done(null, user);
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
  }, async (accessToken, refreshToken, profile, done) => {
    // const userData = {
    //   email: profile.emails[0].value,
    //   name: profile.displayName,
    //   token: accessToken
    // };
    // done(null, userData);
    const existingUser = await db.User.findOne({ googleId: profile.id });
    if(existingUser) {
      console.log("passport.js passport.use existingUser", existingUser)
      done(null, existingUser);
    } else {
      const newUser = await db.User({ googleId: profile.id, displayName: profile.displayName }).save();
      console.log("passport.js passport.use newUser", newUser)
      done(null, newUser);
    }
  })
);