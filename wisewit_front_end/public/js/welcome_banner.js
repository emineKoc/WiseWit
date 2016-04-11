'use strict'
const React = require('react');
const ReactRouter = require('react-router');
const HowItWorks = require('./howitworks.js')

const Welcome = React.createClass({
  render: function(){
    return (
      <div>
        <header>
              <div className="container">
                <div className="intro-text">
                    <div id = "welcome" className="intro-lead-in">Welcome To </div>
                  <div className="intro-heading"> <span id="welcomeLogo">WiseWit </span></div>
                  <a href="#how-it-works" className="page-scroll btn btn-xl">How it works</a>
                </div>
              </div>
            </header>
          <HowItWorks/>

          </div>
          );
        }
      });

module.exports = Welcome;
