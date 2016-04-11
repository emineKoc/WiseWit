'use strict'
const React = require('react');
const auth = require('../authComponents/auth.js');
const $ = require('jquery');

const Poll = React.createClass({
  // let current_user : this.props.current_user
  contextTypes: {
  userid: React.PropTypes.string,
  current_user_name: React.PropTypes.string,
  userid: React.PropTypes.string,
  },




  render:function() {

      return (
        <div>

        <div className="span6">
          <strong>Windows PC</strong><span className="pull-right">30%</span>
          <div className="progress progress-danger active">
              <div className="bar" style="width: 100%;"></div>
          </div>
        </div>

        </div>
      )
    }
  });  // This is the end of idea create form.

  module.exports = Poll;
