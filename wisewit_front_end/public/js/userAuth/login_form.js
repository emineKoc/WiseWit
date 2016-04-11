'use strict'

import React from 'react';
import AuthActions from './auth_actions.js';
import SessionStore from './session_store.js';

let LoginForm = React.createClass({
  handleLogin(e) {
    e.preventDefault();
    let email = this.refs.email.getDOMNode().value.trim();
    let password = this.refs.password.getDOMNode().value.trim();
    AuthActions.login(email, password);
  },
  renderAuthErrors() {
    let errors = SessionState.getAuthErrors();
    if (errors.length === 0) { return null; }
    return (
      <ul className='AuthErrors'>{ errors.map((err) => ( <li>{err}</li> )) }</ul>
    );
  },
  render() {
    let buttonText = SessionState.isAuthRequestInProgress() ? 'Submitting...' : 'Login';
    return (
      <form onSubmit={this.handleLogin}>
        { this.renderAuthErrors() }
        <input type='text' name='email' ref='email' />
        <input type='password' name='password' ref='password' />
        <button disabled={SessionState.isAuthRequestInProgress()}>{buttonText}</button>
      </form>
    );
  }
});

export default LoginForm;
