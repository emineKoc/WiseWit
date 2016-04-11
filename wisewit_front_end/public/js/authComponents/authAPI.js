const $ = require('jquery');

const loginPath = 'http://localhost:9001/authenticate';

let AuthAPI = {
  login(email, password) {
    return new Promise(function(resolve, reject) {
      $.post(loginPath, {email: email, password: password})
        .then((resp) => resolve(resp.data))
        .catch((errResp) => reject(errResp.data));
    });
  }
};

export default AuthAPI;
//
// $.post('http://localhost:9001/api/authenticate', loginInfo)
//   .done((data) => {
//    //  got help from Caleb
//     console.log('This is the token: ' + data.token)
//     localStorage.token = data.token
//    //  getInfo();
//     cb({
//       authenticated: true,
//       token: data.token
//
//     })
//   })
//   .error((error) => {
//     console.log(error);
//     cb({
//       authenticated: false
//     })
//   })
// }
