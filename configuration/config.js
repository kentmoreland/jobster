module.exports = {
  development: {
    db:'mongodb://localhost/jobster',
    port: 8080,
    secret: 'kentified',
  },
  test: {
    db: 'mongodb://localhost/jobster-t',
    port: 3000
  },
};
