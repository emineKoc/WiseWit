'use strict'
const React = require('react');
const CreateProject = require('./create_projects.js')
const CreateTeam = require('./create_group.js')


const UserDashboard = React.createClass({
  getInitialState: function() {
    return {
      projects: []
    }
  },
  addProjects:function(entry){
      this.state.projects.push(entry)
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
