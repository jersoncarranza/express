var Io = require('socket.io');


var SocketIO = function(config){
	config = config || {};
	var io = Io.listen(config.server);

	//vamos crear un canal
	io.sockets.on('connection', function(socket){
		socket.emit('mejorando.la', {hola:'soy el servidor'});
		
		socket.on('mejorandolo', function(data){
		console.log(data);
			//socket.emit('mejorandolo',{hola:'yo tambien soy mejorandola'
		});
	
	});
}
module.exports = SocketIO;