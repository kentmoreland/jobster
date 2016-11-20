const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true},
    email: { type: String, required: true },
    password: {type: String, required: true},
  }
);

UserSchema.pre('save', (next) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(UserSchema.password, salt, (err, hash) => {
      if(err){
        return next(err);
      }
      UserSchema.password = hash;
    });
  });
  next();
});

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if(err){
      return cb(err);
    }
    cb(null, isMatch);

  });
};

UserSchema.methods.generateJwt = () => {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this.id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, 'kentified');
};



module.exports = mongoose.model('user', UserSchema);
