// @author: bigkevzs
var clientCookies =  {

    toCookieString: function (data) {
         return JSON.stringify(data)
                            .replace(/:/,"=")
                            .replace(/,/,";");
    },

    // @note: keys dont have spaces or special characters .
    parseCookieString: function (cookieStr) {
        var raw = cookieStr.replace(/=|;/img,":");
        return JSON.parse(`{${raw}}`);
    },

    set: function set (key, value) {
        var cookieJSON = {};
        if (document.cookie === "" ||  document.cookie === " ") {
            cookieJSON[key] =  value;
            document.cookie = JSON.stringify(cookieJSON);
        } else {
            cookieJSON = this.parseCookieString(document.cookie);
            cookieJSON[key] =  value;
            document.cookie = JSON.stringify(cookieJSON);
        }
    },

    get: function get (key) {
        var cookieJSON = this.parseCookieString(document.cookie);
        return cookieJSON[key];
    }
};