var request = require('request');

var HOSTS = {
  'production': "https://api.instamojo.com/v2/",
  'test': "https://test.instamojo.com/v2/"
};

var AUTHHOSTS = {
  'production': "https://api.instamojo.com/oauth2/token/",
  'test': "https://test.instamojo.com/oauth2/token/"
};

var API = {
  'createPayment': 'payment_requests/',
  'payments': 'payments/',
  'paymentStatus': 'payment_requests/',
  'refunds': 'payments/',
  'paymentforSDK': 'gateway/orders/payment-request/',
};

module.exports = {
  CURRENT_TOKEN: '',
  CURRENT_HOST: 'production',

  AuthHEADERS: {
    'Content-Type': "application/json"
  },

  AuthHEADERS: {
    'Content-Type': "application/x-www-form-urlencoded",
    'Authorization': ""
  },

  isSandboxMode: function (isSandbox) {
    if (isSandbox) {
      this.CURRENT_HOST = 'test';
    } else {
      this.CURRENT_HOST = 'production';
    }
  },

  setToken: function (resToken) {
    this.CURRENT_TOKEN = resToken;
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

  createPayment: function (data, callback) {
    request.post({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.CURRENT_TOKEN
      },
      url: HOSTS[this.CURRENT_HOST] + API.createPayment,
      form: data
    }, function (error, response, body) {
      var result = body;
      callback(error, result);
    });
  },

  createPaymentforSDK: function (data, callback) {
    request.post({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.CURRENT_TOKEN
      },
      url: HOSTS[this.CURRENT_HOST] + API.paymentforSDK,
      form: data
    }, function (error, response, body) {
      var result = body;
      callback(error, result);
    });
  },

  seeAllLinks: function (callback) {
    request.get({
      url: HOSTS[this.CURRENT_HOST] + API.links
    }, function (error, response, body) {
      var result = JSON.parse(body);
      callback(error, result);
    });
  },

  getAllPaymentRequests: function (callback) {
    request.get({
      headers: this.HEADERS,
      url: HOSTS[this.CURRENT_HOST] + API.paymentStatus
    }, function (error, response, body) {
      var result = JSON.parse(body);
      callback(error, result);
    });
  },

  getPaymentRequestStatus: function (id, callback) {
    request.get({
      headers: this.HEADERS,
      url: HOSTS[this.CURRENT_HOST] + API.paymentStatus + id + '/'
    }, function (error, response, body) {
      var result = JSON.parse(body);
      callback(error, result);
    });
  },

  getPaymentDetails: function (payment_request_id, payment_id, callback) {
    request.get({
      headers: this.HEADERS,
      url: HOSTS[this.CURRENT_HOST] + API.paymentStatus + payment_request_id + '/' + payment_id + '/'
    }, function (error, response, body) {
      var result = JSON.parse(body);
      callback(error, result);
    });
  },

  createRefund: function (refundRequest, callback) {
    request.post({
      headers: this.HEADERS,
      url: HOSTS[this.CURRENT_HOST] + API.refunds + '/',
      form: refundRequest
    }, function (error, response, body) {
      var result = JSON.parse(body);
      callback(error, result);
    });
  },

  getAllRefunds: function (callback) {
    request.get({
      headers: this.HEADERS,
      url: HOSTS[this.CURRENT_HOST] + API.refunds
    }, function (error, response, body) {
      var result = JSON.parse(body);
      callback(error, result);
    });
  },

  getRefundDetails: function (id, callback) {
    request.get({
      headers: this.HEADERS,
      url: HOSTS[this.CURRENT_HOST] + API.refunds + id + '/'
    }, function (error, response, body) {
      var result = JSON.parse(body);
      callback(error, result);
    });
  },

  PaymentData: function () {
    return ({
      'purpose': '', // required
      'amount': 0,  // required
      'currency': 'INR',
      'buyer_name': '',
      'email': '',
      'phone': '',
      'send_email': '',
      'send_sms': '',
      'allow_repeated_payments': '',
      'webhook': '',
      'redirect_url': '',

      setWebhook: function (hook) {
        this.webhook = hook;
      },

      setRedirectUrl: function (redirectUrl) {
        this.redirect_url = redirectUrl;
      }
    });
  },

  OrderData: function () {
    return ({
      'id': '', // required
      'phone': ''
    });
  },

  AuthTokenRequestData: function () {
    return ({
      'grant_type': '',
      'client_id': '',
      'client_secret': ''
    });
  },

  RefundRequest: function () {
    return ({
      'payment_id': '',
      'type': '',  // Available : ['RFD', 'TNR', 'QFL', 'QNR', 'EWN', 'TAN', 'PTH']
      'body': '',

      setRefundAmount: function (refundAmount) {
        this.refund_amount = refundAmount;
      }
    });
  }
};