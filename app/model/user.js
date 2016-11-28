const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jobs = require('./job');


const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {type: String},
    email:  String,
    password: String,
    jobs: [{type: Schema.Types.ObjectId, ref: 'jobs.job'}]
  }
);

UserSchema.methods.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err){
      return err;
    }
    callback(null, isMatch);
  });
};

UserSchema.methods.generateJwt = (user) => {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: user._id,
    email: user.email,
    name: user.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, 'kentified');
};



module.exports = mongoose.model('user', UserSchema);
