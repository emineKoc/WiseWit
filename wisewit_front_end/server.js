pry = require('pryjs')
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const pg = require('pg');
const path = require('path');
const userRoutes = require( path.join(__dirname, '/routes/users'));

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('short'));
app.use(express.static(path.join(__dirname,'public')))

app.get('/stuff', function(req,res) {
    res.json('blerrrrggg')
})

app.get('/', function(req,res) {
  console.log('Test')
    res.send('Helloo')
})

app.use('/users', userRoutes)

const port = process.env.PORT || 3000;
const server = app.listen(port)
