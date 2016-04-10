'use strict'
const React = require('react');
const auth = require('./auth');
const $ = require('jquery');

const SignUp = React.createClass({

  handleSubmit: function(event){
      event.preventDefault();

      const signupInfo =
      { user: {
        name: this.refs.name.value,
        email: this.refs.email.value,
        password: this.refs.password.value
        }
      };

       $.post('http://localhost:9001/users', signupInfo)
       .done((data) => { console.log('user saved', signupInfo);
        })
       .error((error) => {
       console.error(error);
     })
      // this.props.updateAuth(true);
 },

      // auth.signup(signupInfo, (thing) => {
      //   // dunnooo some kind of es7 deconstruction?
      // const { location } = this.props;
      // this.context.router.replace('/login');
      // this.refs.createUserForm.reset();
      // })
    // },
  render: function(){
    return (
      <div id="signup" >
        <div className="container text-center">
          <div className="row">
      <div className="col-lg-8 text-left">
      <h4>Sign up</h4>
        <form ref="createUserForm" className="form-horizontal"  onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="col-md-8 control-label"></label>
          <div className="col-md-8">
          <input ref="name" placeholder="name" />
          </div>
          </div>
          <div className="form-group">
            <label className="col-md-8 control-label"></label>
            <div className="col-md-8">
            <input ref="email" placeholder="email" />
            </div>
            </div>
            <div className="form-group">
              <label className="col-md-8 control-label"></label>
              <div className="col-md-8">
              <input ref="password" placeholder="password" />
              </div>
            </div>
          <button type="submit" className="btn btnuser" >Sign Up</button>
        </form>
      </div>
    </div>
  </div>
  </div>
    )
  }
})

//
// function signUpRequest(signupInfo, cb) {
//
//   const d = signupInfo
//
//  $.post('http://localhost:9001/users', d)
//  .done( (data) =>(
//    cb({
//      status: 201,
//      success: true
//    })
//  ))
//  .fail( (data) => {
//    cb({
//      status: 202,
//      data: data
//    })
//  })
// }
//


module.exports = SignUp;
