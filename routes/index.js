const express = require('express');
const router = express.Router();
const client = require('../db');

var allTweets = 'SELECT * FROM users INNER JOIN tweets ON user_id = users.id';

router.get('/', function(req, res) {
  client.query(allTweets, function (err, result) {
    if (err) return err;
    var tweets = result.rows;
    res.render('index', { title: 'Twitter.js', tweets, showForm: true });
  });
});

router.get('/tweets/:id', function(req, res) {
  var id = req.params.id;
  client.query(allTweets + ' WHERE $1 = tweets.id', [id] , function(err, result) {
      if (err) return err;
      var list = result.rows;
      res.render('index', { tweets: list });
  });
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  client.query(allTweets + ' WHERE $1 = users.name', [name], function(err, result) {
      if (err) return err;
      var list = result.rows;
      res.render('index', { tweets: list, showForm: true });
  });
});

// router.post('/tweets', function(req, res) {
//   var name = req.body.name;
//   var text = req.body.text;
//   console.log(name, text);
//   client.query('INSERT INTO users(name) VALUES $1', [name], function(err, result) {
//     if (err) return err;

//     client.query('INSERT INTO tweets(content) VALUES $1', [text], function(err, result) {
//       if (err) return err;
//       console.log(result.rows);
//       var list = result.rows;
//       res.render('index', { tweets: list, showForm: true });
//     });
//   });
//   res.redirect('/');
// });

module.exports = router;



// const tweetBank = require('../tweetBank');

// router.get('/tweets/:id', function(req, res) {
//   var id = req.params.id;
//   var list = tweetBank.find({'id': id});
//   res.render('index', { tweets: list });
// });

// router.get('/users/:name', function(req, res) {
//   var name = req.params.name;
//   var list = tweetBank.find({'name': name});
//   res.render('index', { tweets: list, showForm: true});
// });

// router.get('/', function(req, res) {
//   let tweets = tweetBank.list();
//   res.render('index', { tweets: tweets, showForm: true });
// });

// router.post('/tweets', function(req, res) {
//   var name = req.body.name;
//   var text = req.body.text;
//   tweetBank.add(name, text);
//   res.redirect('/');
// });
