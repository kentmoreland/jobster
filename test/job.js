
let mongoose = require('mongoose');
let Job = require('../app/model/job');

//require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//parent block
describe('Jobs', () => {
  beforeEach((done) => { //Before each test we empty the database
    Job.remove({}, (err) => {
      done();
    });
  });

  //Test the /GET route
  describe('/GET job', () => {
    it('it should GET all the jobs', (done) => {
      chai.request(server)
        .get('/job')
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
        title: "SWE",
        description: "make cool stuff!",
        location: "Gallatin, TN",
        compensation: 200000,
        siteFound: "Google",
        siteApplied: "Google",
        coverLetter: "Dear Google, I am awesome!"
      }
      chai.request(server)
      .post('/job')
      .send(job)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object')
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('company');
        res.body.errors.company.should.have.property('kind').eql('required');
      done();
      });
  });

  it('it should POST a job', (done) => {
    let job = {
      company: "Google",
      title: "SWE",
      description: "make cool stuff!",
      location: "Gallatin, TN",
      compensation: 200000,
      siteFound: "Google",
      siteApplied: "Google",
      coverLetter: "Dear Google, I am awesome!"
    }
    chai.request(server)
    .post('/job')
    .send(job)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Job successfully added!');
      res.body.job.should.have.property('company');
      res.body.job.should.have.property('title');
      res.body.job.should.have.property('description');
      res.body.job.should.have.property('location');
      res.body.job.should.have.property('compensation');
      res.body.job.should.have.property('siteFound');
      res.body.job.should.have.property('siteApplied');
      res.body.job.should.have.property('coverLetter');
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
        location: 'Nashville, TN',
        compensation: 200000,
        siteFound: 'Google',
        siteApplied: 'Google',
        coverLetter: 'Dear Hiring Manager, Pick me I am awesome'
      });
      job.save((err, job) => {
        chai.request(server)
        .get('/job/' + job.id)
        .send(job)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('company');
          res.body.should.have.property('title');
          res.body.should.have.property('description');
          res.body.should.have.property('location');
          res.body.should.have.property('compensation');
          res.body.should.have.property('siteFound');
          res.body.should.have.property('siteApplied');
          res.body.should.have.property('coverLetter');
          res.body.should.have.property('_id').eql(job.id);
        done();
        });
      });
    });
  });

});
