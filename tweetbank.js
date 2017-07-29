'use strict';
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

client.connect(function(err) {
  console.log(err);
});

// function sync(cb) {
//   var sql = require('./seed');
//   client.query(sql, null, function(err) {
//     if (err) return cb(err);
//     cb(null);
//   });
// }

function add(name, content, cb) {

}

function list(cb) {
  var sql = `
    SELECT tweets.id, content, name, picture_url
    FROM users
    JOIN tweets
    ON tweets.user_id = users.id
  `;

  client.query(sql, null, function(err, result) {
    if (err) return cb(err);
    cb(null, result);
  });
}

function find(properties, cb) {

}

module.exports = { add, list, find };
