'use strict'
const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

const HowItWorks = React.createClass({
  render: function(){
    return (
      <section id="how-it-works">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 text-center" >
                      <h2 id = "howitworks" className="section-heading" >How it works ?</h2>
                  </div>
                  <div className="col-lg-12 text-center">
                  <div className="col-lg-4 text-center"> <img src="./img/question.svg"/>
                    <h2 className = "howitworks">Have Questions</h2>
                    <h3> Write your question <br/>and Brainstorm </h3>
                    <Link to="/login"><span className="btn btn-block btnuser" href="#page-top">Start Brainstorming </span> </Link>
                  </div>
                  <div className="col-lg-4 text-center"> <img src="./img/decision.svg"/>
                  <h2 className = "howitworks">Make your Decision</h2>
                  <h3>Get a Random Choice <br/>or Create a Poll </h3>
                  <Link to="/login"><span className="btn btn-block btnuser" href="#page-top">Make decision</span> </Link>

                  </div>
                  <div className="col-lg-4 text-center"><img src="./img/analyze.svg"/>
                  <h2 className = "howitworks">Analyze  your decision</h2>
                  <h3> Make Swot & Tows Analysis and Time to Act! </h3>
                  <Link to="/login"><span className="btn btn-block btnuser">Analyze </span> </Link>


                  </div>
                  </div>

              </div>
          </div>
      </section>
    );
  }
});

module.exports = HowItWorks;
