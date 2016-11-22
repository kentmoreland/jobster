const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');




const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {type: String},
    email:  String,
    password: String,
  }
);


// UserSchema.methods.setPassword = (password, callback) => {
//   bcrypt.hash(password, 10, (err, hash) => {
//     if(err){
//       return callback(err);
//     }
//     this.passwordHash = hash;
//     callback()
//   }).bind(this);
//   console.log(passwordHash);
// };


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
