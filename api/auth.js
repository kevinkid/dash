var Oauth = require('oauth');
var AuthenticationContext = require('adal-node').AuthenticationContext;
var config = require('../api/config');
var credentials = config.accounts.outlook.credentials;
var resource = 'https://graph.microsoft.com/';



// OFFICE 365 //

/**
 * Gets a token for a given resource.
 * @param {string} code An authorization code returned from a client.
 * @param {string} res A URI that identifies the resource for which the token is valid.
 * @param {AcquireTokenCallback} callback The callback function.
 */
function getTokenFromCode(code, callback) {
    var authContext = new AuthenticationContext(adalConfiguration.authority);
        authContext.acquireTokenWithAuthorizationCode(
            code,
            adalConfiguration.redirectUrls[0],
            resource,
            adalConfiguration.clientID,
            adalConfiguration.clientSecret,
            function (error, token) {
                if (error) {
                    callback(error, token);
                } else {
                    callback(token, token);
                }
            }
        );
}

/**
 * get accesstoken from refreshtoken
 * @param  {String}   refereshToken stored refreshtoken
 * @param  {Function} callback      
 */
function getTokenFromRefreshToken(refereshToken, callback) {
    var authContext = new AuthenticationContext(adalConfiguration.authority);
        authContext.acquireTokenWithRefreshToken(
            refereshToken,
            adalConfiguration.redirectUri,
            resource,
            adalConfiguration.clientID,
            adalConfiguration.clientSecret,
            function (error, token) {
                if (error) {
                    console.log("error Getting token from refereshToken .");
                    callback(error,null);
                }else {
                    console.log("Succss getting access token .");
                    callback(null,token);
                }
        })
}




// OUTLOOK //

/**
 * @param {string} - authentication code 
 * @param {Function} - callback execution 
 */
function getToken (code, callback) {
    var Oauth2 = Oauth.OAuth2;
    var oauth = new Oauth2(
        credentials.clientID,
        credentials.clientSecret,
        credentials.authority,
        credentials.authorize_endpoint,
        credentials.token_endpoint
    );

    oauth.getOauthAccessToken(
        code,
        {
            grant_type: 'authorization_code',
            redirect_uri: credentials.redirectUrls[0],
            response_mode: 'form_post',
            state: 'asdf'
        },
        callback
    );

}


// GMAIL //

function _getToken (code, callback) {



}



module.exports = {
    getToken: getToken,
    getTokenFromCode: getTokenFromCode,
    getTokenFromRefreshToken: getTokenFromRefreshToken
}