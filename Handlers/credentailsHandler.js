// @desc - Renew credentails and check if its past the date time .
var db = require('./dbHelper');
var mongoose = require('mongoose');
var client = require("../Handlers/client.js");
var moment = require('moment');
var sw = require('../Helpers/sw');

var credManager = {

    // TODO: reduce the number of calls 
    verify: function (account) {
        db.findClient(mongoose, account, client, function (data) {
            return data;
        });
    },

    autoRefresh: function (account) {
        // TODO: Auto renew users token depending on the
        sw.autoRenewToken(); 
    },

    pastExpirtyDate: function (date) {

    },

    checkTokenValidity: function (account) {
        if (this.verify(account.email)) {
            return this.pastExpirtyDate(account);
        }
    }

};



module.exports = credManager;