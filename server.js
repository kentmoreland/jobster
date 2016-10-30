let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let port = 8080;
let job = require('./app/routes/job');

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


//routes
app.get('/', (req, res) => res.json({message: 'Welcome to Jobster!'}));

app.route('/job')
   .get(job.getJobs)
   .post(job.postJob);

app.route('/job/:id')
   .get(job.getJob)
   .delete(job.deleteJob)
   .put(job.updateJob);




//server connect
app.listen(port);
console.log('listening on port ' + port);


module.exports = app; //for testing
