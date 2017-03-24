let env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const jwt = require('express-jwt');

const auth = jwt({
  secret: config.secret,
  userProperty: 'payload'
});

module.exports = {auth};