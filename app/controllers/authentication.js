const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../model/user');

module.exports = {

  register: (req, res) => {
    let user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.save((err) => {
      let token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        'token': token,
      });
    });
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
