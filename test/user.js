const User = require('../app/model/user');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');

const should = chai.should();

chai.use (chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
    User.remove({}, () => {
      done();
    });
  });

  describe('/GET user', () => {
    it('should GET all of the users', (done) => {
      chai.request(server)
        .get('/api/user')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should add a new user', (done) => {
      let user = {
        name: 'Kent',
        email: 'kentmoreland@gmail.com',
        password: 'password',
      };

      chai.request(server)
        .post('/api/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.user.should.have.property('name');
          res.body.user.should.have.property('email');
          res.body.user.should.have.property('password');
          done();
        });
    });
  });

});
