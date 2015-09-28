// Transpile ES6 to ES5
require('babel/register');

var chalk = require('chalk');

var port = (process.env.PORT || 8080);
var app;

// Start the server

app = require('./app');
app.listen(port, function() {
  console.log('The server is listening on port', chalk.green.bold(port), 'and loves you very much.');
});