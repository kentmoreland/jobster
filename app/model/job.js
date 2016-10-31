let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let JobSchema = new Schema(
  {
    company: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    location: {type: String, required: true},
    // ApplyDate: {type: },
    compensation: {type: Number},
    siteFound: {type: String, required: true},
    siteApplied: {type: String, required: true},
    coverLetter: {type: String},
  }
);

module.exports = mongoose.model('job', JobSchema);
