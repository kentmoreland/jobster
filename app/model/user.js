const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {type: String},
    email:  String,
    password: String,
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
