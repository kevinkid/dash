// var serviceWorker = require('node-service-worker');
var moment = require('moment');
var db = require('./database');

var sw = {

    convertDateToSeconds: function (expiryDate) {
        var duration = moment.duration(expiryDate, moment.ISO_8601);
        return duration.asSeconds();
    },

    refreshToken: function () {
        // TODO: Use the account manager to get the refreset token and request for a new token.
    },

    sleep: function (time) {
        return setTimeout(time);
    },

    createWorker: async function (account) {
        // @bug - incase of memory issues - https://www.npmjs.com/package/deferred
        // @bug - incase of memory issue - https://www.npmjs.com/package/node-service-worker
        return new Promise(() => {
            // await this.sleep();
            //this.convertDateToSeconds(this.sleep(account.expiryDate));
            this.refreshToken(account);
        });
    },

    autoRenewToken: function (account) {
        this.createWorker(account);
    }

};

module.exports = sw;