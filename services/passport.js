const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  // user id is the mongo profile, since we may use multiple auth providers.  Mongo ID will be unique
  // oauth is to allow someone to sign in. after that we use our internal id (user.id)
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile ID
          // no error, returning existing user
          done(null, existingUser)
        } else {
          // no user record with this ID, make a new record
          new User({ googleId: profile.id }).save().then(user => done(null, user))
        }
      })
    }
  )
)
