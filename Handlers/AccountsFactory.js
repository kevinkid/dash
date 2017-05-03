var mongoose = require('mongoose');
var db = require('../Helpers/database');
var AuthenticationContext = require('adal-node').AuthenticationContext;
var config = require('../api/config');
var db = require('../Helpers/database');
var client = require("../Handlers/client.js");

function create () {
    // TODO: Create a new account .
}

function Query (email) {
    // TODO: query the database for the account 
    db.findClient();
}

/** @return {string} fully formed authentication url */
function getAuthUrl(type) {

    var accCredentails = config.accounts[type].credentials;

    switch (type) {
        case "office": 
        return accCredentails.authority + '/oauth2/authorize' +
                '?client_id=' + accCredentails.clientID +
                '&response_type=code' +
                '&redirect_uri=' + accCredentails.redirectUri;        
        break;
        
        case "outlook":  
            return accCredentails.authUrl;
        break;

        case "gmail":
            return "Gmail Authentication url";
        break;

        case "slack":
            return "slack Authentication url";
        break;

        case "evernote":
            return "evernote Authentication url";
        break;
    }
}

function getAuthenticationURL(accountType, clientkey) {
    if (!clientkey &&  accountType != null) {
        var Existing = verifyAccount(accountType);
        if((typeof Existing) == 'boolean') {
            return generateAuthURL(accountType);
        }
    }
}

// NOTE: There are two reason why we might need to verify for an account 
// 1. if a user is installing a new client 
// 2. if a user is installing a new client in a different machine 
// TODO: Make sure the client set the clientkey on the browser for us to 
//       query. That is if the clientkey exist .
// 3. if a user tries to add an account that already exist.

/** @desc - Verify account by authcode to reduce the amount of request . */
function verifyAccount(clientkey) {
    db.findClient(mongoose,clientkey, client,function(dbClient) {
        if (dbClient == undefined) {
            return false;
        } else {
            return dbClient;
        }
    });
}

// TODO: handle multiple account payloads from here, used by 
var outlookAuthURL = getAuthUrl,
    officeAuthURL = getAuthUrl,
    gmailAuthURL = getAuthUrl,
    outlookSubscriptionPayload = {},
    officeSubscriptionPayload = {},
    gmailSubscriptionPayload = {};


module.exports = {
    payload : {
        subscriptions: {
            outlook: outlookSubscriptionPayload,
            office: officeSubscriptionPayload,
            gamil: gmailSubscriptionPayload

        },
        authUrls: {
            outlook: outlookAuthURL,
            office: officeAuthURL,
            gmail: gmailAuthURL
        }
    },
    find: Query,
    verifyAccount: verifyAccount,
    getAuthenticationURL: getAuthenticationURL,
    getAuthUrl: getAuthUrl 
};
