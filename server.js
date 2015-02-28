var  cluster = require ('cluster');
//
if (cluster.isMaster){//si el culster es master
	var Master = require('./master.js');
	var master = new Master({cluster:cluster});
	var cpuCount = require('os').cpus().length; //cuenta los cpu que tiene le ciompurador


	for(var i=0; i< cpuCount ; i++){
		master.createWorker();
	}

	cluster.on('exit', function (worker){
		console.log('worker'+ worker.id + 'died');
		master.onWorkerexit();
	})

}else{
	var workers = require('./workers.js');
	new workers();

	console.log('worker'+ cluster.worker.id+ 'running');
}