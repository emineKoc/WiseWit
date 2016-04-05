'use strict'
const React = require('react');
const $ = require('jquery');


const CreateGroup = React.createClass({
  render: function() {
    return (
      <div id="create-a-project text-center">
      <div className="container">
      <div className="row">
      <div className="col-lg-6 text-left">
      <h4> Create a Team</h4>
      <form className="form-horizontal" ref= "create-team" onSubmit= {this.handleSubmit}>

      <div className="form-group">
        <label className="col-md-8 control-label"></label>
        <div className="col-md-8">
        <input id="textinput" name="textinput" type="text" placeholder="Team Name" className="form-control input-md"/>
        </div>
      </div>

      <div className="form-group">
        <label className="col-md-8 control-label" ></label>
        <div className="col-md-8">
          <select ref="selectbasic" name="selectbasic" className="form-control">
            <option value="1">Type of the project</option>
            <option value="2">Private</option>z
            <option value="3">Team Name</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <div className="col-md-8">
          <button  className="btn btn-info">Create a team</button>
        </div>
      </div>
      </form>
      </div>
      </div>
      </div>
      </div>
    )
  }
})

module.exports = CreateGroup;
