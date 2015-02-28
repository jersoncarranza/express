var http	= require('http');
var conf = require('./conf.json');
var expressServer = require('./app/ExpressServer.js');
var mongoose = require('mongoose');
var socketIO= require('./app/socketIO.js');
 
//todo lo que no es el server va ser objeto
var worker = function  (config) {
	config = config || {}; 

	mongoose.connect('mongodb://'+ conf.db.host +'/'+ conf.db.name);
	var app = new expressServer();


	var server = http.createServer(app.expressServer);
	var Io = new socketIO({server:server});

	server.listen(conf.port);
	console.log('escuchando el puerto 7000');
};
module.exports = worker;


//para poder debuggearlos
if (module.parent){//es para llamarlo al padre 
module.exports = worker; 
}else{
	new worker();// o si no creese a si mismo
	console.log('debuggers')
}