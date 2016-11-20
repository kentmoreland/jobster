let mongoose = require('mongoose');
let User = require('../model/user');


module.exports = {
  // getUsers: (req, res) => {
  //   let query = User.find({});
  //   query.exec((err, users) => {
  //     if(err){
  //       return (res.send(err));
  //     }
  //     return (res.json(users));
  //   });
  // },
  // addUser: (req, res) => {
  //   let newUser = new User(req.body);
  //
  //   newUser.save((err, user) => {
  //     if(err){
  //       return (res.send(err));
  //     }else{
  //       return (res.json({message: 'successfully added a new user', user}));
  //     }
  //   });
  // }


};
