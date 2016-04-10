'use strict'
const React = require('react');
const ReactRouter = require('react-router');
const ReactBootstrap = require('react-bootstrap');

const Link = ReactRouter.Link;
const auth = require('./authComponents/auth.js');
const Login = require('./authComponents/login.js');
const Logout = require('./authComponents/logout.js');
const SignUp = require('./authComponents/signup.js');

const Nav = React.createClass({
  render: function(){

    return (
      <nav className = "navbar navbar-default navbar-fixed-top">
      <div className="container nav">
      <div className="navbar-header page-scroll">

      <a className="navbar-brand page-scroll"> <Link to="/">WiseWit</Link> </a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
           <ul className="nav navbar-nav navbar-right">
             <li className="hidden">
               <a href="#page-top"/>
             </li>
             <li>
               <a className="page-scroll" >
               {this.props.loggedIn ? true : <nav> </nav> }
               </a>
             </li>
             <li>
               <a className="page-scroll" href="#ideas">
               <Link to="/ideas">Ideas</Link>
               </a>
             </li>
             <li>
               <a className="page-scroll" href="#swot">
               <Link to="/swot">Swot</Link>
               </a>
             </li>
             <li>
               <a className="page-scroll">
                    {this.props.loggedIn ? (
                   <Link to="/logout">Log out</Link>
                    ) : (
                   <Link to="/login">Sign in</Link>
                 )}</a>
             </li>
             <li>
               <a className="page-scroll" href="#signup">
               <Link to="/new">Sign Up</Link>
               </a>
             </li>
           </ul>
         </div>
         {/* /.navbar-collapse */}
         {/* /.container-fluid */}
       </div>
       </nav>
    )
  }
})

module.exports = Nav;
