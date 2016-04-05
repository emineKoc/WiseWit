'use strict'
const React = require('react');
// const auth = require('./auth');
const $ = require('jquery');

const ShowGroups = React.createClass({
    allgroups: function(){
      const all_groups = $.ajax('http://localhost:9001/groups', {
        dataType: 'json',
        method: 'GET',
      })
      .done( function(data) {
        console.log(data);
      })
      return (
      )
    },

    render: function(){
      return (
      )
    }

})


module.exports = ShowGroups;
