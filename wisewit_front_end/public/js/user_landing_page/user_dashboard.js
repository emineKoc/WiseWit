'use strict'
const React = require('react');
const CreateProject = require('./create_projects.js')
const CreateTeam = require('./create_group.js')
const ShowGroups = require('./show_groups.js')
const ShowUser= require('./show_groups.js')

const UserDashboard = React.createClass({
  getInitialState: function() {
    return {
      projects: {},
      groups: {}
    }
  },
  handlegroups:function(state){
    this.setState({groups:state})
  },
  addProjects:function(entry){
    this.setState({projects:entry})
  },
  render: function() {
    // <ShowGroups handlegroups = {this.handlegroups} groups = {this.state.groups}/>
    // <CreateProject/>
    // <CreateTeam/>
    return (
      <section>
    </section>
    )
  }
})


module.exports = UserDashboard;
