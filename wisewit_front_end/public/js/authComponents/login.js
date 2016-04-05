'use strict'
const React = require('react');
const auth = require('./auth');

const Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      error: false
    }
  },

  handleSubmit: function(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace('/')
      }
    })
  },

  render: function() {
    return (
      <section id="signup">
 <div className="container">
   <div className="row">
     <div className="col-lg-8 text-left">
     <h4>Sign in</h4>
     <form ref="login" className="form-horizontal"  onSubmit={this.handleSubmit}>
     <div className="form-group">
       <label className="col-md-8 control-label"></label>
       <div className="col-md-8">
       <input ref="email" placeholder="email" />
       </div>
       </div>
       <div className="form-group">
         <label className="col-md-8 control-label"></label>
         <div className="col-md-8">
         <input ref="pass" placeholder="password" />
         </div>
       </div>
     <button type="submit" className="btn btn-info"  >login</button>
     {this.state.error && (
       <p>Bad login information</p>
     )}

    </form>
  </div>
</div>
</div>
</section>
    )
  }
})

module.exports = Login;
