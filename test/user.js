const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../jobster');
const User = require('../app/model/user')
const should = chai.should();
const mongoose = require('mongoose');
const dbpath = 'mongodb://localhost/jobster-t';

chaiRequestWithUserrouteCallback = (user, route, callback) => {
  chai.request(server)
  .post(route)
  .send(user)
  .end(callback)
};

let user = {
  name: 'Kent',
  email: 'kentmoreland@gmail.com',
  password: 'password'
};


describe('user routes', () => {
  describe('/register', () => {
    it('should add a user', () => {
      chaiRequestWithUserrouteCallback(user, '/api/register', (err, res) => {
        res.should.have.status(200);
        res.body.should.be.an(object);
      })
    });
  });
});