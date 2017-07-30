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

function findUserId(name, cb) {
  var sql = `
    SELECT id
    FROM users
    WHERE name = $1
  `;

  client.query(sql, [name], function(err, result) {
    if (err) cb(err);
    if (!result.rows.length) {
      client.query('INSERT INTO users(name) VALUES ($1) RETURNING id', [ name ], function(err ,result) {
        if (err) return cb(err);
        cb(null, result.rows[0].id);
      });
    }
    else {
      cb(null, result.rows[0].id);
    }
  });
}


function add(name, content, cb) {
  findUserId(name, function(err, result) {
    if (err) cb(err);

    var userId = result;

    var sql = `
      INSERT INTO tweets (user_id, content)
      VALUES ($1, $2)
      RETURNING id
    `;

    client.query(sql, [ userId, content ], function(err, result) {
      if (err) return cb(err);
      cb(null, { id: result.rows[0].id, content, name });
    });
  });
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

  client.query(sql, [ prop ], function(err, result) {
    if (err) return cb(err);
    cb(null, result.rows);
  });
}

module.exports = { add, list, find };
