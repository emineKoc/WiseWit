'use strict'
const React = require('react');
// const auth = require('./auth');
const $ = require('jquery');

const ShowGroups = React.createClass({
  componentDidMount:function() {
      let that = this
      $.ajax('http://localhost:9001/users/24/groups', {
        dataType: 'json',
        method: 'GET',
      })
      .done( function(data) {
        console.log(data);
        data.forEach(function(el){
        that.props.groups[el.id] = el;
        })
        that.props.hanglegroups(that.props.groups)
        console.log('this is props ',that.props.groups);
      })
    },
    render: function(){

      return (
        <div>

        </div>
      )
    }
})


module.exports = ShowGroups;
