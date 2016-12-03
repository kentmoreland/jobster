const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    company: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    link: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    website: { type: String },
    applyDate: { type: Date },
    compensation: { type: Number },
    rangeh: { type: Number },
    rangel: { type: Number },
    siteFound: { type: String, required: true },
    siteApplied: { type: String, required: true },
    coverLetter: { type: String },
    status: { type: String, required: true },
  }
);

module.exports = mongoose.model('job', JobSchema);
