'use strict';
var cron 			= require('node-cron');

var Version = 2;
var clientVersion;


exports.start = function start (io) {
	io.on('connection', function(socket){
		// console.log("S_CHECK_VERSION here");
		S_CHECK_VERSION (socket);
	});
}

function S_CHECK_VERSION(socket) {
	// console.log("socket: ");
	// console.log(socket);
	socket.on('S_CHECK_VERSION', function getData(data){
		console.log("S_CHECK_VERSION");
		console.log(data);
		clientVersion = getCurrentVersion(data);
		console.log("clientVersion: "+clientVersion);
	});
}

function getCurrentVersion(data)
{
	return clientVersion =
	{
		Version :data.Version,
	}
}

// cron.schedule('*/1 * * * * *',function(){
// 	console.log("here");
// });