'use strict'
const React = require('react');
const auth = require('./auth');

const ShowUser = React.createClass({
  showUser:function(id) {
    $.ajax('http://localhost:9001/users/'+id , {
      dataType: 'json',
      method: 'GET',
    })
    .done( function(data) {
      console.log('this should be the single user who signed in',data)
  },
  render: function(){

  }
})

module.exports = ShowUser;
