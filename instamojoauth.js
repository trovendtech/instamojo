var request = require('request');

var AUTHHOSTS = {
  'production': "https://api.instamojo.com/oauth2/token/",
  'test': "https://test.instamojo.com/oauth2/token/"
};


module.exports = {

  AuthHEADERS: {
    'Content-Type': "application/json"
  },

  CURRENT_HOST: 'production',

  isSandboxMode: function (isSandbox) {
    if (isSandbox) {
      this.CURRENT_HOST = 'test';
    } else {
      this.CURRENT_HOST = 'production';
    }
  },


  createToken: function (data, callback) {
    request.post({
      headers: this.AuthHEADERS,
      url: AUTHHOSTS[this.CURRENT_HOST],
      form: data
    }, function (error, response, body) {
      var result = body;
      callback(error, result);
    });
  },

  AuthTokenRequestData: function () {
    return ({
      'grant_type': '',
      'client_id': '',
      'client_secret': ''
    });
  },

};