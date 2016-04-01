var express     = require('express');
var users       = express.Router();
var bodyParser  = require('body-parser');
var db          = require('./../db/pg');
var secret      = "my sweet secret"
var expressJWT  = require('express-jwt');
var jwt         = require('jsonwebtoken');


users.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
});
users.use('/me', expressJWT({secret: secret}));


users.post('/', db.createUser, (req, res) => {
  res.status(201).json({data: 'success'});
})

users.get('/me', (req, res) => {
  res.json({data: 'success', agent: req.user});
})

users.post('/login', db.loginUser, (req, res) => {
  var token = jwt.sign(res.rows, secret);

  res.json({agent: res.rows, token: token});
})

module.exports = users;
