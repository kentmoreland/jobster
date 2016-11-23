const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.use(new LocalStrategy({
  usernameField: 'email'
},

(username, password, done) => {
  User.findOne({ email: username}, (err, user) => {
    if(err){
      console.log('err');
      return done(err);
    }
    if(!user){
      console.log('!user');
      return done(null, false, {message: 'User not found'});
    }
    user.comparePassword(password, user.password, (err, isMatch) => {
      if(err){
        return err;
      }
      if(isMatch) {
        return done(null, user);
      } else {
        console.log('compare password');
        return done(null, false, {message: 'Password is wrong'});
      }
    });
  });
}));
