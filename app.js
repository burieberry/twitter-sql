const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const chalk = require('chalk');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const port = process.env.PORT || 3000;

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use('/', express.static(path.join(__dirname, '/public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Log requests, url, status code
app.use('/', function(req, res, next) {
  res.on('finish', function() {
    console.log(chalk.blue(req.method), req.url, chalk.red(res.statusCode));
  });
  next();
});

// route to homepage
app.use('/', routes);

// Fallback for all page requests
app.use(function(req, res, next) {
  res.status(404).send('You idiot. This page does not exist.');
});

// listen for requests on port
app.listen(port, function() {
  console.log(chalk.magenta(`Listening intently on port ${port}`));
});
