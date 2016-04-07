'use strict'
const React = require('react');
const auth = require('./auth');
const $ = require('jquery');

// const ShowUser = React.createClass({
//   showUser:function() {
//     $.ajax('http://localhost:9001/' , {
//       dataType: 'json',
//       method: 'GET',
//     })
//     .done( function(data) {
//       console.log('this should be the single user who signed in',data)
//    })
//  },
//   render: function(){
//     return(
//       <div>
//       <button onClick={this.showUser}>test button</button>
//       </div>
//     )
//   }
// })


const ShowUser = React.createClass({
  getInitialState : function() {
    return {
      me: ''
    }
  },
  seeMe : function(e) {
    e.preventDefault()

    $.ajax({
      url: 'http://localhost:9001/users',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done((data) => {
      this.setState({me: data.email})
    })
  },

  render : function() {
    const token = auth.getToken()
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p> {token} </p>
        <p>what it this: {this.state.me}</p>
        <button onClick={this.seeMe}> see your info</button>
      </div>
    )
  }
})

module.exports = ShowUser;
