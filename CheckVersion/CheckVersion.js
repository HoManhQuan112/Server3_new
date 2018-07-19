'use strict';
var cron 			= require('node-cron');

var version = 2;
var clientVersion;


exports.start = function start (io) {
	io.on('connection', function(socket){
		console.log("S_CHECK_VERSION here");
		S_CHECK_VERSION (socket);
	});
}

function S_CHECK_VERSION(socket) {
	socket.on('S_CHECK_VERSION', function (data){
		if (data.Version!=version) {			
			R_CHECK_VERSION(socket);
		}		
	});
}

function R_CHECK_VERSION(socket) {
	socket.emit('R_CHECK_VERSION',{
		Version : version
	});
}
// cron.schedule('*/1 * * * * *',function(){
// 	console.log("here");
// });