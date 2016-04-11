'use strict'
import Reflux from 'reflux';
import AuthActions from './auth_actions';

// This object is where we'll store all the session state.
// It will be a private variable and if any outside code
// wants to access it, they'll need to use one of the
// accessor methods below.
let _sessionState = {
  authRequestInProgress: false,
  authErrors: [],
  authToken: null,
  email: null,
  userId: null
};

let SessionStore = Reflux.createStore({
  // Map all the actions in AuthActions to the corresponding
  // methods below
  listenables: [AuthActions],

  // When a login request occurs, use the AuthAPI to make
  // an api request to the server and call the appropriate
  // action when it finishes.
  // Trigger a change to alert subscribers about the fact
  // that a request is in progress.
  onLoginRequest (email, password) {
    _sessionState.authRequestInProgress = true;
    AuthAPI.login(email, password)
      .then(AuthActions.loginRequest.completed)
      .catch(AuthActions.loginRequest.failed);
    this.trigger(_sessionState);
  },

  // When a login request completes successfully,
  // set the user info to the session state object and
  // trigger a change
  // an api request to the server and call the appropriate
  // action method when it finishes.
  onLoginRequestCompleted (resp) {
    _sessionState.authRequestInProgress = false;
    _sessionState.authErrors = [];
    _sessionState.authToken = resp.auth_token;
    _sessionState.email = resp.email;
    this.trigger(_sessionState);
    // You'll also need to redirect the user to the proper page,
    // but that's outside the scope of the article
  },

  // When a login request fails, set the auth errors
  // and trigger a change
  onLoginRequestFailed (resp) {
    _sessionState.authRequestInProgress = false;
    _sessionState.authErrors = resp.errors;
    this.trigger(_sessionState);
  },

  // When the user logs out, clear out the session state
  // and trigger a change
  onLogout () {
    _sessionInfo = {
      authRequestInProgress: false,
      authErrors: [],
    };
    this.trigger(_sessionState);
  },

  // Accessor Methods
  getemail() { return _sessionState.email; },
  getUserId() { return _sessionState.userId; },
  isLoggedIn() { return (_sessionState.authToken !== null); },
  getAuthErrors() { return (_sessionState.authErrors !== null); },
  isAuthRequestInProgress() { return (_sessionState.authRequestInProgress === true); }
});

export default SessionStore;
