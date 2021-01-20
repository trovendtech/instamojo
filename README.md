# instamojo

After struggling for days, we noticed there is no solid solution for Instamojo Integration with NodeJS and Mobile SDK's
so we came up with this package which helps every developer who is trying to integrate Instamojo using Node as Backend.

How to Use?

const InstaAuth = require('instamojo_v2/instamojoauth');

const getTokenID = async req => {
    var data = new Insta.AuthTokenRequestData();
    data.grant_type = "client_credentials";
    data.client_id = "XXX"; // Client ID
    data.client_secret = "XXX"; //Client Secret which can generated from https://test.instamojo.com/integrations or https://www.instamojo.com/integrations

    Insta.isSandboxMode(false) // true or fale depending on your test/prod

    return new Promise((resolve, reject) => {
        Insta.createToken(data, function (err, response) {
            if (err) {
                reject(utils.buildErrObject(200, err.message))
            } else {
                resolve(JSON.parse(response))
            }
        });
    })
}

After reading Token ID,
Called below two for getting the order id.

Insta.createPayment - Pass the Order Data along with bearer token
Insta.createPaymentforSDK - Pass the Order ID return from above along with bearer token
