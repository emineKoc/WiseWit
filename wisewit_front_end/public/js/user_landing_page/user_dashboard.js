'use strict'
const React = require('react');
const CreateProject = require('./create_projects.js')
const CreateTeam = require('./create_group.js')
// const ShowGroups = require('./show_groups.js')

const UserDashboard = React.createClass({
  getInitialState: function() {
    return {
      projects: [],
      groups: []
    }
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
      </section>
    )
  }
})


module.exports = UserDashboard;
