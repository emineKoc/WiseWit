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

 getToken: function() {
   return localStorage.token
 },

 logout: function(cb) {
   delete localStorage.token
   if (cb) cb()
   this.onChange(false)
 },

 loggedIn: function() {
   return !!localStorage.token
 },

 onChange: function() {}
} // end of module.exports


function loginRequest(email, pass, cb) {

 var loginInfo = {
   user: {
   email: email,
   password: pass
 }
 }

 $.post('http://localhost:9001/users/login', loginInfo)
   .done((data) => {
     console.log("login post : ", data);
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
