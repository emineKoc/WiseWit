'use strict'
const React = require('react');
const auth = require('./auth');
const $ = require('jquery');

const SignUp = React.createClass({
  handleSubmit: function(event){
      event.preventDefault();
      const signupInfo = { user: {
        email: this.refs.email.value,
        password: this.refs.password.value,
      }
      }

      signUpRequest(signupInfo);
      this.refs.createUserForm.reset();
  },

  render: function(){
    return (
     <section id="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
          <h4>Sign up</h4>
            <form ref="createUserForm" onSubmit={this.handleSubmit}>
              <label><input ref="email" placeholder="email" /></label>
              <label><input ref="password" placeholder="password" /></label>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
      </section>
    )
  }
})


function signUpRequest(signupInfo) {

  const d = signupInfo

 $.post('http://localhost:9001/users', d)
   .done((data) => {
   })
   .error((error) => {
     console.error(error);
   })
}

module.exports = SignUp;
