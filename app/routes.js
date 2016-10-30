let mongoose = require('mongoose');
let Job = require('./model/job');


function getJobs(req, res){
  let query = Job.find({});
  query.exec((err, jobs) => {
    if(err){
      res.send(err);
    };
    res.json(jobs);
  });
}

function postJob(req, res){
  let newJob = new Job(req.body);

  newJob.save((err, job) => {
    if(err){
      res.send(err);
    }else{
      res.json({message: 'Job successfully added!', job });
    }
  });
}

function getJob(req, res){
  Job.findById(req.params.id, (err, job) => {
    if(err){
      res.send(err);
    }
    res.json(job);
  });
}

function deleteJob(req, res) {
  Job.remove({_id : req.params.id}, (err, result) => {
    res.json({ message: 'Job successfully deleted!', result});
  });
}


function updateJob(req, res){
  Job.findById({_id: req.params.id}, (err, job) => {
    if(err) res.send(err);
    Object.assign(job, req.body).save((err, job) => {
      if(err) res.send(err);
      res.json({ message: 'Job updated!', job});
    });
  });
}

module.exports = { getJobs, postJob, getJob, deleteJob, updateJob };
