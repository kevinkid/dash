var fs = require("fs");
var Url = require("url");
var path = require('path');
var http = require('http');
var qs = require("querystring");
var express = require('express');
var app = express();
var mongoose = require("mongoose");
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var signalr = require("signalrjs");
var signalR = signalr();
var jsdom = require("jsdom-no-contextify");
var message = require("./routes/message");
var listen = require("./routes/listen");
var login = require("./routes/index");
var db = require("./Helpers/database");
var client = require("./Handlers/client");
var notifications = require("./Handlers/notifications");
var config = require('./api/config');
var DBConnection = mongoose.connection;
DBConnection.setMaxListeners(0);
var cors = require("cors");
var conCounter = 0;

// Port config 
app.set('port', process.env.PORT || 3000);

// Environment
var ENV = process.env.NODE_ENV || 'development';
app.locals.ENV = ENV;
app.locals.ENV_DEVELOPMENT = ENV === 'development';


/** @desc - signalr hub configuration . */
signalR.serverProperties.ProtocolVersion = 1.3;
app.use(signalR.createListener());
console.dir("Protocal v:" + signalR.serverProperties.ProtocolVersion);// remove me 

signalR.hub('MyHub', {
    Send : function (name, message) {
        this.clients.all.invoke('AddMessage').withArgs([name, message]);
    }
});

// cors config 
app.use(cors());

// app config 
app.use(require('stylus').middleware(path.join(__dirname, 'frontend')));
app.use(favicon(__dirname + '/frontend/img/favicon.ico'));
app.use(express.static(path.join(__dirname, 'frontend')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Define routes 
app.use('/', login);
app.use('/listen', listen);
app.use('/message', message);


// Db config 
var DBoptions = {
    server: { socketOptions: { keepAlive: 500000, connectTimeoutMS: 50000, auto_reconnect: true } }, 
    replset: { socketOptions: { keepAlive: 500000, connectTimeoutMS : 50000, auto_reconnect: true } }
};

mongoose.connect((config.database[ ENV ]).host, DBoptions);

DBConnection.on('error', function() {
    mongoose.disconnect();
});

// Log errors to better manage the application lifecycle .
process.on("uncaughtException", function (ex) {
    var date = new Date();
    fs.exists("../log.txt", function (exist) {
        if (!exist) {
            fs.writeFile("../log.txt", `Error : ${date} : ${ex} \n`, function (er, data) {
                if  (er) {
                    console.error("Error logging to file.");
                }
                    console.error(ex);
            });
        } else {
            fs.appendFile("../log.txt", `Error : ${date} : ${ex} \n`,
             function (errr) {
                if  (errr) {
                    console.error(errr);
                }
                    console.error(ex);
            });
        }
    });
});

DBConnection.on('disconnected', function(err) {
    if (conCounter>5)  throw new Error("Database Connection Error");
    
    mongoose.connect((config.database[ ENV ]).host, DBoptions);
    conCounter++;
});

DBConnection.once('open', function () {
    console.log("Database connected ! ");
    app.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
});

