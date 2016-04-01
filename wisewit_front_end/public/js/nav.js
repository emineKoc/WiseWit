'use strict'
const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;
const auth = require('./authComponents/auth.js');
const Login = require('./authComponents/login.js');
const Logout = require('./authComponents/logout.js');
const SignUp = require('./authComponents/signup.js');

const Nav = React.createClass({
  render: function(){
    return (
      <nav className="navbar">
        <nav>
        {this.props.loggedIn ? true : <nav></nav>}
        </nav>
        <nav>
        {this.props.loggedIn ? (
          <Link to="/logout">Log out</Link>
        ) : (
          <Link to="/login">Sign in</Link>
        )}
        </nav>
        <nav><Link to="/new">Sign Up</Link></nav>
      </nav>
    )
  }
})

module.exports = Nav;
