const $ = require('jquery');

module.exports = {
 login: function(email, pass, cb) {
   cb = arguments[arguments.length - 1]
   if (localStorage.token) {
     if (cb) cb(true)
     this.onChange(true)
     return
   }
   loginRequest(email, pass, (res) => {
     if (res.authenticated) {
       localStorage.token = res.token
       if (cb) cb(true)
       this.onChange(true)
     } else {
       if (cb) cb(false)
       this.onChange(false)
     }
   })
 },

 signup(email, password, cb) {
   cb = arguments(arguments.length - 1);
    signupRequest(name, email, pass, (res) => {
    cb();
    })
  },

 getToken: function() {
   return localStorage.token
 },

 logout: function(cb) {
   delete localStorage.token
   if (cb) cb()
   this.onChange(false)
 },

 loggedIn: function() {
   return !! localStorage.token
 },

 onChange: function() {}
} // end of module.exports

/* Sign-up AJAX Request */
function signupRequest(name, email, pass, cb) {
  var loginInfo = {
    user: {
    name:name,
    email: email,
    password: pass
     }
  }
  $.post('http://localhost:9001/users/', loginInfo)
    .done((data) => {
      cb({
        status: 201,
        success: true
      })
    })
    .fail((data) => {
      cb({
        status: 202,
        data: data
      })
    })
}

// Log in request
function loginRequest(email, pass, cb) {
 var loginInfo = {
   user: {
   email: email,
   password: pass
    }
 }
 $.post('http://localhost:9001/users/login', loginInfo)
   .done((data) => {
     console.log('This is the token: ' + data.token)
    //  localStorage.token = data.token
     cb({
       authenticated: true,
       token: data.token

     })
   })
   .error((error) => {
     console.log(error);
     cb({
       authenticated: false
     })
   })
}


















// function getInfo() {
//    $.ajax({
//      url: 'http://localhost:9001/users/login',
//      type: 'Get',
//      beforeSend: function(xhr){
//        xhr.setRequestHeader('Authorization', localStorage.token );
//      }
//    })
//    .done(function(data){
//      debugger
//      if (data) {
//        console.log('successully logged in');
//        console.log('user id: ' + data.id);
//        console.log('user email: ' + data.email);
//      } else {
//        console.log('successully logged OUT.');
//        this.logout()
//      }
//      console.log('Is the user token expired? ' + data.expired);
//    })
//  }
