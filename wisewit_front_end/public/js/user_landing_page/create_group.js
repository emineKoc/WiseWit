'use strict'
const React = require('react');
const $ = require('jquery');

const CreateGroup = React.createClass({
  handleSubmit:function(event){
    event.preventDefault()

    const groupInfo = { group: {
      name: this.refs.name.value,
      description: this.refs.description.value,
      members:[]
      }
    }
    this.createGroup(groupInfo)
  },

  createGroup: function(groupInfo) {

    const group = groupInfo
    $.post(
  {
    url : 'http://localhost:9001/groups',
    data : group,
    beforeSend: function( xhr ) {
      xhr.setRequestHeader( "Authorization", 'Bearer ' + localStorage.token );
      }
      }).done((data) => {
     })
     .error((error) => {
       console.error(error);
     })
  },


  render: function() {
    // console.log(token.email)

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
        <input ref = "name" type="text" placeholder="Team Name" className="form-control input-md"/>
        </div>
      </div>

      <div className="form-group">
        <label className="col-md-8 control-label"></label>
        <div className="col-md-8">
        <input ref = "description" type="text" placeholder="Team description" className="form-control input-md"/>
        </div>
      </div>

      <div className="form-group">
        <label className="col-md-8 control-label"></label>
        <div className="col-md-8">
        <input ref = "members" type="text" placeholder="Team Members" className="form-control input-md"/>
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
