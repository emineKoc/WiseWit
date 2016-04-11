'use strict'
const React = require('react');


const Dashboard = React.createClass({
  seeme(){
  $.ajax({
  url: 'http://localhost:9001/users/me',
  beforeSend: function( xhr ) {
    xhr.setRequestHeader("Authorization", auth.getToken() );
    }
  }).done((data) => {
    this.setState({me: data.agent.email})
  })
},
  render() {
    const token = auth.getToken()

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
})

module.exports = Dashboardxxx;
