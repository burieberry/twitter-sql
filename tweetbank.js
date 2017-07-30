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
    cb(null, result.rows);
  });
}

function find(properties, cb) {
  var sql = `
    SELECT tweets.id, content, name, picture_url
    FROM users
    JOIN tweets
    ON tweets.user_id = users.id
  `;

  if (properties.name) {
    sql = `${sql} WHERE name = $1`;
  }

  if (properties.id) {
    sql = `${sql} WHERE tweets.id = $1`;
  }

  var prop = properties.name || properties.id;

  client.query(sql, [prop], function(err, result) {
    if (err) return cb(err);
    cb(null, result.rows);
  });
}

module.exports = { add, list, find };
