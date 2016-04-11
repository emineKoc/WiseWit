'use strict'

import axios from 'axios';

const loginPath = '/api/authenticate';

let AuthAPI = {
  login(email, password) {
    return new Promise(function(resolve, reject) {
      axios.post(loginPath, {email: email, password: password})
        .then((resp) => resolve(resp.data))
        .catch((errResp) => reject(errResp.data));
    });
  }
};

export default AuthAPI;
