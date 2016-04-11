'use strict'
const React = require('react');
const ReactRouter = require('react-router');

const Footer = React.createClass({
  render: function(){
    return (
      <div id="footer">
      <p id="footerNotes">created by Emine Koc </p>
      </div>
    );
  }
});

module.exports = Footer;
