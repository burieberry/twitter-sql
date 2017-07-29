'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const chalk = require('chalk'); // color the console output
const routes = require('./routes');
const nunjucks = require('nunjucks'); // templating engine

const app = express(); // store application instance in an app variable

// Nunjucks templating setup
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // give html files to res.render
nunjucks.configure('views', { noCache: true }); // point nunjucks to views dir

app.use('/', express.static(path.join(__dirname, '/public')));

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: false })); // for HTML form submits
app.use(bodyParser.json()); // for AJAX requests

// Log requests, url, status code
app.use(function(req, res, next) {
  res.on('finish', function() {
    console.log(chalk.blue(req.method), chalk.gray(req.url), chalk.yellow(res.statusCode));
  });
  next();
});

// Route to homepage
app.use('/', routes);

// Fallback for all page requests
app.use(function(req, res, next) {
  res.status(404).send('You idiot. This page does not exist.');
});

// Start the server
const port = 3000 || process.env.PORT;
const tweetbank = require('./tweetbank');

app.listen(port, function() {
  console.log(chalk.magenta(`Listening intently on port ${port}`));
  // tweetbank.sync(function(err) {
  //   if (err) return console.log(err);
  // });
});
