'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');

const Router = ReactRouter.Router;
const browserHistory = ReactRouter.browserHistory;
const Route = ReactRouter.Route;
const Link = ReactRouter.Link;
const Navigation  = ReactRouter.Navigation;

const auth = require('./authComponents/auth.js');
const $ = require('jquery');
const Nav = require('./nav.js');
const Welcome = require('./welcome_banner.js');

const Login = require('./authComponents/login.js');
const Logout = require('./authComponents/logout.js');
const SignUp = require('./authComponents/signup.js');
const ShowUser = require('./authComponents/user_profile.js');
const Ideas = require('./ideas/create_ideas.js');
const Swot = require('./swot/create_swot.js');


const UserDashboard = require('./user_landing_page/user_dashboard.js');

const App = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: auth.loggedIn(),
      profile : false,
      edit : false,
      ideasRoute : false,
      current_user_name: '',
      userid: '',
      user:{}

    }
  },
// **************

  childContextTypes: {    //pass value down to child.
    current_user_name: React.PropTypes.string,
    userid: React.PropTypes.string,
    setCurrentUserId: React.PropTypes.func,
  },
  getChildContext: function(){    //get value from child.
    return {
      current_user_name: this.state.current_user_name,
      userid: this.state.userid,
      setCurrentUserId: this.setCurrentUserId,
    }
  },
  setCurrentUserId: function(id) {
    // console.log(id)
    // var userinfo;
    if (id!='') {
      this.setState({userid: id});


      getUserInfo.on('value', (snapshot) => {
        var userinfo = snapshot.val()[id];
        this.setState({
          current_user_name: userinfo.name,
          userinfo: userinfo,
        });
      })
    } else {
      this.setState({
        current_user_name:'',
        userid: '',
      })
    }
    // console.log(this.state.userinfo);
    // this.setState({user: id})
  },
  // componentWillMount: function() {
  //   auth.onChange = this.updateAuth
  //   auth.login
  // },

  componentWillMount: function(){
      auth.onChange = this.updateAuth
      auth.login

    if(auth.getToken()){
      var currentuser = auth.getToken();
        console.log('test component will mount',currentuser)
        this.setState({
          current_user_name: currentuser.name,
          userid: currentuser.id,
    })
    } else {
      this.setState({
        user: '',
        userid: '',
      });
    }
  },



// **************

  getUserInfo: function(event) {
      $.ajax({
        url: 'http://localhost:9001/users/',
        beforeSend: function( xhr ) {
          xhr.setRequestHeader("Authorization", auth.getToken());
        }
      }).complete((data) => {
        console.log('this is the current user data', data)
        this.setUserState({user: data})
      })
    },
  //
  // setUserState:function(data){
  //   this.state.user = data;
  //   this.setState({user: data})
  // },

  updateAuth: function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },


  render: function() {
    const token = auth.getToken()  //???


    return (
      <div>
        <Nav loggedIn={this.state.loggedIn} ideasRoute = {this.state.ideasRoute}/>
        {this.props.children || <p> {this.state.loggedIn} You are {!this.state.loggedIn && 'not'} logged in.</p>}

          {this.state.loggedIn ? ( <UserDashboard current_user = {this.state.current_user}/> ) :
        ( <Welcome /> ) }
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

var ErrorPage = React.createClass({
  render : function() {
    return <h1>404: Not Found... sry</h1>
  }
})

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="new" component={SignUp} />
      <Route path="ideas" component={Ideas} onEnter={requireAuth}/>
      <Route path="SWOT" component={Swot} onEnter={requireAuth}/>
      <Route path="dashboard" component={UserDashboard} onEnter={requireAuth} />
      <Route path="UserDashboard" component={UserDashboard} onEnter={requireAuth} />
    </Route>
    <Route path="*" component={ErrorPage} />
  </Router>
), document.querySelector('#app'))
