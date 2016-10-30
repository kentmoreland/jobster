let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let JobSchema = new Schema(
  {
    Company: {type: String, required: true},
    Title: {type: String, required: true},
    Description: {type: String},
    Location: {type: String, required: true},
    // ApplyDate: {type: },
    Compensation: {type: Number},
    SiteFound: {type: String, required: true},
    SiteApplied: {type: String, required: true},
    CoverLetter: {type: String},
  }
);

module.exports = mongoose.model('job', JobSchema);
