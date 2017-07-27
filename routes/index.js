const express = require('express');
const router = express.Router();
const db = require('../db/index.js');
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

module.exports = router;
