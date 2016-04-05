'use strict'
const React = require('react');
const CreateProject = require('./create_projects.js')
const CreateTeam = require('./create_group.js')
const ShowGroups = require('./show_groups.js')

const UserDashboard = React.createClass({
  getInitialState: function() {
    return {
      user:{},
      projects: {},
      groups: {}
    }
  },
  hanglegroups:function(state){
    this.setState({groups:state})
  },
  addProjects:function(entry){
      this.state.projects.push(entry)
  },
  addGroups:function(group){
    this.state.groups.push(group)
  },
  render: function() {
    return (
      <section>
      <CreateProject/>
      <CreateTeam/>
      <ShowGroups hanglegroups = {this.hanglegroups} groups = {this.state.groups}/>
      </section>
    )
  }
})


module.exports = UserDashboard;
