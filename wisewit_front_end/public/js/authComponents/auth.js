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
    //  got help from Caleb
     console.log('This is the token: ' + data.token)
     localStorage.token = data.token
     getInfo();
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

// reference: https://github.com/Umbrellagun/debate-dissector/blob/master/debate_dissector/public/js/components/auth.js
function getInfo() {
   $.ajax({
     url: 'http://localhost:9001/users/login',
     type: 'Get',
     beforeSend: function(xhr){
       xhr.setRequestHeader('Authorization', localStorage.token );
     }
   })
   .done(function(data){
     debugger
     if (data) {
       console.log('Should be saying this if logged IN.');
       console.log('This should be the user id: ' + data.id);
       console.log('This should be the username: ' + data.email);
     } else {
       console.log('Should be saying this if logged OUT.');
       console.log('This should be the default id data: ' + data.id);
       console.log('This should be the default username data: ' + data.email);
       this.logout()
     }
     console.log('Is the user token expired? ' + data.expired);
   })
 }
