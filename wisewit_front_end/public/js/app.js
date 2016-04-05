'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');

const Router = ReactRouter.Router;
const browserHistory = ReactRouter.browserHistory;
const Route = ReactRouter.Route;
const Link = ReactRouter.Link;

const auth = require('./authComponents/auth.js');
const $ = require('jquery');
const Nav = require('./nav.js')
const Welcome = require('./welcome_banner.js')
const HowItWorks = require('./howitworks.js')

const Login = require('./authComponents/login.js');
const Logout = require('./authComponents/logout.js');
const SignUp = require('./authComponents/signup.js');

const UserDashboard = require('./user_landing_page/user_dashboard.js');

const App = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth: function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount: function() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render: function() {
    return (
      <div>
        <Nav loggedIn={this.state.loggedIn} />
        {this.props.children || <p>{this.state.loggedIn} You are {!this.state.loggedIn && 'not'} logged in.</p>}
        <Welcome />
        <HowItWorks />
        <UserDashboard/>
      </div>
    )
  }
})

//
// const Dashboard = React.createClass({
//   getInitialState: function() {
//     return {
//       user: ''
//     }
//   },
//
//   getUserInfo: function(event) {
//     event.preventDefault();
//
//     $.ajax({
//       url: 'http://localhost:9001/users/:id',
//       beforeSend: function( xhr ) {
//         xhr.setRequestHeader("Authorization", auth.getToken());
//       }
//     }).complete((data) => {
//     })
//   },
//
//   render: function() {
//     const token = auth.getToken()
//
//     return (
//       <div>
//         <h1>Dashboard</h1>
//         <p>{this.state.me}</p>
//         <button onClick={this.getUserInfo}>Show My Info</button>
//         {token}
//       </div>
//     )
//   }
// })


function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


const ErrorPage = React.createClass({
  render: function() {
    return(
      <h1>404: Not Found</h1>
    )
  }
})

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="new" component={SignUp} />
      <Route path="dashboard" component={UserDashboard} onEnter={requireAuth} />
    </Route>
    <Route path="*" component={ErrorPage} />
  </Router>
), document.querySelector('#app'))
