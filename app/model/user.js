const mongoose = require('mongoose');
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



module.exports = mongoose.model('user', UserSchema);
