var connectBtn = $("#connectBtn");
var outlookBtn = $("#outlook-btn");
var gmailBtn = $("#gmail-btn");
var skypeBtn = $("#skype-btn");
var slackBtn = $("#slack-btn");
var yammerBtn = $("#yammer-btn");
var evernoteBtn = $("#evernote-btn");

function urlQueryToObject () {
    var objParam = {},
        url = document.location.replace();

    var code = /code=(.*);$/.exec(url).replace(/;|code/m,"");
    var clientState = /clientState=(.*);&$/.exec(url).replace(/;|clientState/m,"");

    objParam.code = code;
    objParam.clientState = clientState;
    return objParam;
}

function redirectOutlook () {
    var paramObj = urlQueryToObject();
    var account = "outlook";
    location.href = location.host+"/callback/"+account+"?code="+
                    paramObj.code+"&clientState="+paramObj.clientState;
}


function redirectGmail () {
    var paramObj = urlQueryToObject();
    var account = "gmail";
    location.href = location.host+"/callback/"+account+"?code="+
                    paramObj.code+"&clientState="+paramObj.clientState;

}

function redirectSkype () {
    var paramObj = urlQueryToObject();
    var account = "skype";
    location.href = location.host+"/callback/"+account+"?code="+
                    paramObj.code+"&clientState="+paramObj.clientState;

}

function redirectYammer () {
    var paramObj = urlQueryToObject();
    var account = "yammer";
    location.href = location.host+"/callback/"+account+"?code="+
                    paramObj.code+"&clientState="+paramObj.clientState;

}

function redirectSlack () {
    var paramObj = urlQueryToObject();
    var account = "slack";
    location.href = location.host+"/callback/"+account+"?code="+
                    paramObj.code+"&clientState="+paramObj.clientState;

}

function redirectEvernote () {
    var paramObj = urlQueryToObject();
    var account = "evernote";
    location.href = location.host+"/callback/"+account+"?code="+
                    paramObj.code+"&clientState="+paramObj.clientState;

}

function removeCookies () {
    redirectClient();
    browserCookies.delete();
}

// listeners
connectBtn.on('click', removeCookies);

outlookBtn.on('click', redirectOutlook);
gmailBtn.on('click', redirectGmail);
skypeBtn.on('click', redirectSkype);
yammerBtn.on('click', redirectYammer);
evernoteBtn.on('click', redirectEvernote);

