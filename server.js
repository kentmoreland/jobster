let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let port = 8080;
let job = require('./app/routes/job');
let path = require('path');

//db connection
mongoose.connect('mongodb://localhost/jobster-t');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("we're connected!");
});

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//apiroutes
app.get('/api', (req, res) => res.json({message: 'Welcome to Jobster!'}));

app.route('/api/job')
   .get(job.getJobs)
   .post(job.postJob);

app.route('/api/job/:id')
   .get(job.getJob)
   .delete(job.deleteJob)
   .put(job.updateJob);


//frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/views','index.html' ))
})

//server connect
app.listen(port);
console.log('listening on port ' + port);


module.exports = app; //for testing
