'use strict'
const React = require('react');
const ReactRouter = require('react-router');

const HowItWorks = React.createClass({
  render: function(){
    return (
      <section id="how-it-works">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 text-center">
                      <h2 className="section-heading">How it works</h2>
                  </div>
              </div>
          </div>
      </section>
    );
  }
});

module.exports = HowItWorks;
