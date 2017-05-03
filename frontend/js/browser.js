var connectBtn = $("#connectBtn");

function urlQueryToObject () {
    var objParam = {},
        url = document.location.replace();

    var code = /code=(.*);$/.exec(url).replace(/;|code/m,"");
    var clientState = /clientState=(.*);&$/.exec(url).replace(/;|clientState/m,"");

    objParam.code = code;
    objParam.clientState = clientState;
    return objParam;
}

function redirectClient () {
    var paramObj = urlQueryToObject();
    var account = "outlook";
    location.href = location.host+"/callback/"+account+"?code="+
                    paramObj.code+"&clientState="+paramObj.clientState;

}

function removeCookies () {
    redirectClient();
    browserCookies.delete();
}

connectBtn.on('click', removeCookies);
