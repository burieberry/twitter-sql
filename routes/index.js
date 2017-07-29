'use strict';
const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');

// function to get all tweets
function allTweets(req, res, next) {
  let tweets = tweetBank.list();
  res.render('index', { title: 'Twitter JS', tweets, showForm: true });
}

router.get('/', allTweets);
router.get('/tweets', allTweets);

router.get('/users/:name', function(req, res, next) {
  var name = req.params.name;
  var tweets = tweetBank.find({'name': name});
  res.render('index', { tweets, username: name, showForm: true});
});

router.get('/tweets/:id', function(req, res, next) {
  var id = req.params.id * 1;
  var tweets = tweetBank.find({'id': id});
  res.render('index', { tweets });
});

router.post('/tweets', function(req, res, next) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = router;
