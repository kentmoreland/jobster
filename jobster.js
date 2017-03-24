const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const job = require('./app/controllers/job');
const user = require('./app/controllers/authentication');
const livereload = require('livereload');
let env = process.env.NODE_ENV || 'development';
const config = require('./configuration/config')[env];
const server = livereload.createServer();
const passport = require('passport');
const jwtConfig = require('./configuration/jwtConfig');
require('./app/model/user');
require('./configuration/passport');

server.watch(`${__dirname}/public`);

const app = express();

app.set('port', process.env.PORT || config.port || 8080);

// db connection
mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we\'re connected!');
});

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());



// apiroutes
app.get('/api', (req, res) => res.json({ message: 'Welcome to Jobster!' }));

app.route('/api/job')
   .get(jwtConfig.auth, job.getJobs)
   .post(jwtConfig.auth, job.postJob);

app.route('/api/jobs/:userid')
   .get(jwtConfig.auth, job.getUserJobs);

app.route('/api/job/:id')
   .get(jwtConfig.auth, job.getJob)
   .delete(jwtConfig.auth, job.deleteJob)
   .put(jwtConfig.auth, job.updateJob);

app.route('/api/register')
   .get(user.getUsers)
   .post(user.register);

app.route('/api/login')
  .post(user.login);

app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError'){
    res.status(401);
    res.json({'message' : err.name + ': ' + err.message});
  }
});

// frontend routes
app.use(express.static(`${__dirname}/public`));

// server connect
app.listen(app.get('port'));
console.log(`Connect success! Listening on port ${app.get('port')}.`);


module.exports = app;
