'use strict'
const React = require('react');
const $ = require('jquery');

const CreateProject = React.createClass({

  render: function() {
    return (
      <div id="create-a-project text-center">
      <div className="container">
      <div className="row">
      <div className="col-lg-6 text-left">
      <h4> Create a project</h4>
      <form className="form-horizontal" ref= "create-project" onSubmit= {this.addProjects}>

      <div className="form-group">
        <label className="col-md-8 control-label"></label>
        <div className="col-md-8">
        <input id="textinput" name="textinput" type="text" placeholder="Project Name" className="form-control input-md"/>
        </div>
      </div>

      <div className="form-group">
        <label className="col-md-8 control-label" ></label>
        <div className="col-md-8">
          <select ref="selectbasic" name="selectbasic" className="form-control">
            <option value="1">Type of the project</option>
            <option value="2">Private</option>
            <option value="3">Team Name</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <div className="col-md-6">
          <button  className="btn btn-info">Create a project</button>
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

module.exports = CreateProject;
