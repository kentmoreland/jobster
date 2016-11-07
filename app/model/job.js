const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    applyDate: { type: Date },
    compensation: { type: Number },
    rangeh: { type: Number },
    rangel: { type: Number },
    siteFound: { type: String, required: true },
    siteApplied: { type: String, required: true },
    coverLetter: { type: String },
  }
);

module.exports = mongoose.model('job', JobSchema);
