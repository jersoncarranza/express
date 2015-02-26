var env = process.env.NODE_ENV || 'development',
	express = require('express'),
	swig	= require('swig'),
	router	= require('./websites/router.js'),
	bodyParser = require('body-parser'),
	middlewares = require('./middlewares/admin.js');


var ExpressServer = function  (config) {
	config = config || {};
	this.expressServer = express();

	//middlewares
	this.expressServer.use(bodyParser.urlencoded({ extended: false }))
	for(var middleware in middlewares){
		this.expressServer.use(middlewares[middleware]);
	}

	//templates
	this.expressServer.engine('html', swig.renderFile);
	this.expressServer.set('view engine', 'html');
	this.expressServer.set('views', __dirname + '/websites/views/templates');

	//trabajar em ambiente de desarrolo
	if(env == 'development') {
		console.log('ok NO hay cache',env);//NODE_ENV=development supervisor --debug server.js
		this.expressServer.set('view cache', false);//desabilitar cache
		swig.setDefaults({cache:false});
	}else{console.log('ok SI hay cache',env);}


	//rutas
	this.expressServer.get('/',function (req, res ,next) {
		res.render('index',{nombre:'jerson'});
	});

	//rutas dinamicas
	for(var controller in router){
		for(var funcionalidad in router[controller].prototype){
			method = funcionalidad.split('_')[0];
			name = funcionalidad.split('_')[1];
			data = funcionalidad.split('_')[2];

			/*data = (method === 'get' && data !== undefined) ? ':data' : '';*/
			data = (data !== undefined) ? ':data' : '';

			var url='/'+controller+'/'+name+'/'+data;
			this.router(controller,funcionalidad,method,url);
		}
	}	
};

ExpressServer.prototype.router= function(controller,funcionalidad,method,url) {
	console.log(url);
	this.expressServer[method](url,function(req,res,next) {
		var conf = {
			'funcionalidad':funcionalidad,
			'req':req,
			'res':res,
			'next':next
		}
		var Controller = new router[controller](conf);
		Controller.response();
	});
};

module.exports = ExpressServer;