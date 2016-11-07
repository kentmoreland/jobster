const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const job = require('./app/routes/job');
const livereload = require('livereload');

const server = livereload.createServer();

server.watch(`${__dirname}/public`);

const app = express();
const port = 8080;

// db connection
mongoose.connect('mongodb://localhost/jobster-t');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("we're connected!");
});

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// apiroutes
app.get('/api', (req, res) => res.json({ message: 'Welcome to Jobster!' }));

app.route('/api/job')
   .get(job.getJobs)
   .post(job.postJob);

app.route('/api/job/:id')
   .get(job.getJob)
   .delete(job.deleteJob)
   .put(job.updateJob);


// frontend routes
app.use(express.static(`${__dirname}/public`));

// server connect
app.listen(port);
console.log(`Connect success! Listening on port ${port}.`);


module.exports = app; // for testing
