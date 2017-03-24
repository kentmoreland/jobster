const Job = require('../app/model/job');
const User = require('../app/model/user');
const user = require('../app/controllers/authentication');
const passport = require('passport');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../jobster.js');
const mongoose = require('mongoose');
const should = chai.should();
const dbpath = 'mongodb://localhost/kwork-t';

chai.use(chaiHttp);

let testUser = {
  name: 'Kent',
  email: 'kentmoreland@gmail.com',
  password: 'password',
};

let testUserAuth;
let testUserId;

mongoose.connect(dbpath, () => {
  User.findOne({name: 'Kent'}, (err, person) => {
    if(err){ console.log(err)}
    testUserId = person._id;
  });
});



describe('Jobs', () => {

  before((done) => {
    chai.request(server)
    .post('/api/register')
    .send(testUser)
    .end((err, res) => {
      testUserAuth = res.body.token;
      done();
    });
  });

  beforeEach((done) => {
    Job.remove({}, () => {
      done();
    });
  });


  describe('/GET job', () => {
    it('should GET a joblist for a user', (done) => {
      chai.request(server)
        .get('/api/job')
        .set('authorization', 'Bearer ' + testUserAuth)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST job', () => {
    it('it should not POST a job without a company field', (done) => {
      let job = {
        title: 'SWE',
        description: 'make cool stuff!',
        location: 'Gallatin, TN',
        link: 'www.google.com',
        compensation: 200000,
        applyDate: '2016-11-05',
        siteFound: 'Google',
        siteApplied: 'Google',
        coverLetter: 'Dear Google, I am awesome!',
        status: 'In progress'
      };
      chai.request(server)
      .post('/api/job')
      .set('authorization', 'Bearer ' + testUserAuth)
      .send(job)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('company');
        res.body.errors.company.should.have.property('kind').eql('required');
        done();
      });
    });

    it('it should POST a job', (done) => {
      let job = {
        company: 'Google',
        title: 'SWE',
        description: 'make cool stuff!',
        link: 'www.google.com',
        city: 'Gallatin',
        state: 'TN',
        applyDate: '2016-11-05',
        compensation: 200000,
        siteFound: 'Google',
        siteApplied: 'Google',
        coverLetter: 'Dear Google, I am awesome!',
        status: 'In progress'
      };
      chai.request(server)
      .post('/api/job')
      .set('authorization', 'Bearer ' + testUserAuth)
      .send(job)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Job successfully added!');
        res.body.job.should.have.property('company');
        res.body.job.should.have.property('title');
        res.body.job.should.have.property('description');
        res.body.job.should.have.property('city');
        res.body.job.should.have.property('state');
        res.body.job.should.have.property('applyDate');
        res.body.job.should.have.property('compensation');
        res.body.job.should.have.property('siteFound');
        res.body.job.should.have.property('siteApplied');
        res.body.job.should.have.property('coverLetter');
        res.body.job.should.have.property('status');
        done();
      });
    });
  });

  describe('/GET/:id job', () => {
    it('it should GET a job by the given id', (done) => {
      let job = new Job({
        company: 'Google',
        title: 'SWE',
        description: 'crush apps',
        link: 'www.google.com',
        city: 'Nashville',
        state: 'TN',
        compensation: 200000,
        siteFound: 'Google',
        siteApplied: 'Google',
        coverLetter: 'Dear Hiring Manager, Pick me I am awesome',
        status: 'In progress'
      });
      job.save((err, job) => {
        chai.request(server)
        .get('/api/job/' + job.id)
        .set('authorization', 'Bearer ' + testUserAuth)
        .send(job)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('company');
          res.body.should.have.property('title');
          res.body.should.have.property('description');
          res.body.should.have.property('link');
          res.body.should.have.property('city');
          res.body.should.have.property('state');
          res.body.should.have.property('compensation');
          res.body.should.have.property('siteFound');
          res.body.should.have.property('siteApplied');
          res.body.should.have.property('coverLetter');
          res.body.should.have.property('status');
          res.body.should.have.property('_id').eql(job.id);
          done();
        });
      });
    });
  });
  describe('/PUT/:id job', () => {
    it('it should update a job given the id', (done) => {
      let job = new Job({
        company: 'Facebook',
        title: 'SWD',
        description: 'crush apps',
        link: 'www.facebook.com',
        city: 'Gallatin',
        state: 'TN',
        compensation: 250000,
        siteFound: 'Indeed',
        siteApplied: 'Indeed',
        coverLetter: 'Dear Hiring Manager, Pick me I am awesome',
        status: 'In progress',
      });
      job.save((err, job) => {
        chai.request(server)
      .put('/api/job/' + job.id)
      .set('authorization', 'Bearer ' + testUserAuth)
      .send({
        company: 'Facebook',
        title: 'SWD',
        description: 'crush apps',
        link: 'www.facebook.com',
        city: 'Silicon Valley',
        state: 'CA',
        compensation: 250000,
        siteFound: 'Indeed',
        siteApplied: 'Indeed',
        coverLetter: 'Dear Hiring Manager, Pick me I am awesome',
        status: 'In progress'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Job updated!');
        res.body.job.should.have.property('city').eql('Silicon Valley');
        res.body.job.should.have.property('state').eql('CA');
        done();
      });
      });
    });
  });
  describe('/DELETE/:id job', () => {
    it('it should DELETE a job given the id', (done) => {
      let job = new Job({
        company: 'Facebook',
        title: 'SWD',
        description: 'crush apps',
        link: 'www.facebook.com',
        city: 'Silicon Valley',
        state: 'CA',
        compensation: 250000,
        siteFound: 'Indeed',
        siteApplied: 'Indeed',
        coverLetter: 'Dear Hiring Manager, Pick me I am awesome',
        status: 'In progress'
      });
      job.save((err, job) => {
        chai.request(server)
        .delete('/api/job/' + job.id)
        .set('authorization', 'Bearer ' + testUserAuth)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Job successfully deleted!');
          res.body.result.should.have.property('ok').eql(1);
          res.body.result.should.have.property('n').eql(1);
          done();
        });
      });
    });
  });
});
