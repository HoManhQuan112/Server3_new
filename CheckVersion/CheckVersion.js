'use strict';
var cron 			= require('node-cron');

var Version = 2;
var clientVersion;


exports.start = function start (io) {
	io.on('connection', function(socket){
		S_CHECK_VERSION (socket);
	});
}

function S_CHECK_VERSION(socket) {
	socket.on('S_CHECK_VERSION', function (data){
		console.log("S_CHECK_VERSION");
		console.log(data);
		clientVersion = getCurrentVersion(data);
		console.log("clientVersion: "+clientVersion);
	});
}

function getCurrentVersion(data)
{
	return currentUser =
	{
		Version :data.Version,
	}
}

// cron.schedule('*/1 * * * * *',function(){
// 	console.log("here");
// });