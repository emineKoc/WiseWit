'use strict'
const React = require('react');
const ReactRouter = require('react-router');

const Welcome = React.createClass({
  render: function(){
    return (
        <header>
              <div className="container">
                <div className="intro-text">
                    <div className="intro-lead-in">Welcome To </div>
                  <div className="intro-heading"> WiseWit </div>
                  <a href="#how-it-works" className="page-scroll btn btn-xl">How it works</a>
                </div>
              </div>
            </header>
          );
        }
      });

module.exports = Welcome;
