let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let port = 8080;

mongoose.connect('mongodb://localhost/jobster-t');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("we're connected!");
});

app.get('/', (req, res) => res.json({message: 'Welcome to Jobster!'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(port);
console.log('listening on port ' + port);
