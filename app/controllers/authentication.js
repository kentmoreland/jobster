const mongoose = require('mongoose');
const User = require('../model/user');
const passport = require('passport');
const bcrypt = require('bcrypt');

const saltRounds = 10;


module.exports = {

  register: (req, res) => {
    let user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      user.password = hash;
      user.save((err) => {
        let token;
        token = user.generateJwt(user);
        res.status(200);
        res.json({
          'token': token,
        });
      });
    });
  },

  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      let token;
      if(err){
        res.status(404).json(err);
        return;
      }
      if(user){
        token = user.generateJwt();
        res.status(200);
        res.json({
          'token': token
        });
      } else {
        res.status(401).json(info);
      }
    })(req, res, next);
  },

  getUsers: (req, res) => {
    let query = User.find({});
    query.exec((err, users) => {
      if(err){
        return (res.send(err));
      }
      return (res.json(users));
    });
  },
};
