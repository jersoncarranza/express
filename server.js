var http	= require('http');
var conf = require('./conf.json');
var expressServer = require('./app/ExpressServer.js');
var mongoose = require('mongoose');
 
mongoose.connect('mongodb://'+ conf.db.host +'/'+ conf.db.name);
var app = new expressServer();


var server = http.createServer(app.expressServer);
server.listen(conf.port);
console.log('escuchando el puerto 7000');