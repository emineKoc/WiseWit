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
    return (
      <section>
      <CreateProject/>
      <CreateTeam/>
      <h1>show all groups</h1>
      <ShowGroups handlegroups = {this.handlegroups} groups = {this.state.groups}/>
      </section>
    )
  }
})


module.exports = UserDashboard;
