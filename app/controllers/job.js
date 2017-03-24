let mongoose = require('mongoose');
let Job = require('../model/job');
let User = require('../model/user');

module.exports = {

  getUserJobs: (req, res) => {
    let query = Job.find({ user : req.params.userid });
    query.exec((err, jobs) => {
      if(err){
        console.log(err);
        return ( res.send(err) );
      }else if(jobs){
        return ( res.json(jobs) );
      }else{
        return (res.json ( {message: 'Nothing in here!'}) );
      }
    });
  },

  getJobs: (req, res) => {
    let query = Job.find({});
    query.exec((err, jobs) => {
      if(err){
        return ( res.send(err) );
      }
      return (res.json(jobs) );
    });
  },

  postJob: (req, res) => {
    let newJob = new Job(req.body);
    newJob.save((err, job) => {
      if(err){
        return ( res.send(err) );
      }else{
        return ( res.json({message: 'Job successfully added!', job }) );
      }
    });
  },

  getJob: (req, res) => {
    Job.findById(req.params.id, (err, job) => {
      if(err){
        return (res.send(err) );
      }
      return ( res.json(job) );
    });
  },

  deleteJob: (req, res) =>  {
    Job.remove({_id : req.params.id}, (err, result) => {
      return ( res.json({ message: 'Job successfully deleted!', result}) );
    });
  },

  updateJob: (req, res) => {
    Job.findById({_id: req.params.id}, (err, job) => {
      if(err){
        return ( res.send(err) );

      }
      Object.assign(job, req.body).save((err, job) => {
        if(err){
          return ( res.send(err) );
        }
        return ( res.json({ message: 'Job updated!', job}) );
      });
    });
  }

};
