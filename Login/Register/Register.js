'use strict';
var database		= require('./../../Util/Db_s3.js');
// var sendMail 		= require('./../../Util/sendMail.js');
// var functions 		= require('./../../Util/functions.js');
// var userBase		= require('./../../UserBase/userBase.js');

var currentUser,DetailError;

exports.Start = function start (io) {
	io.on('connection', function(socket){
		S_REGISTER (socket);
	});
}

function S_REGISTER (socket) {
	socket.on('S_REGISTER', function (data){
		//currentUser = getCurrentUser(data);
		//console.log(currentUser);
		//queryUser (currentUser,socket);
		console.log('S_REGISTER');
		console.log(data);
	});
}
function getCurrentUser(data)
{
	return currentUser =
	{
		UserName : data.UserName,
		Email : data.Email,
		Password : data.Password,
		
	}
}
function queryUser (currentUser,socket) {
	database.query("SELECT * FROM `users` WHERE `UserName`='"+currentUser.name+"' OR `UserEmail`='"+currentUser.email+"'",function (error,rows) {
		if (!!error){DetailError = ('register: Error queryUser '+ currentUser.name);functions.writeLogErrror(DetailError);}
		if (rows.length>0) {
			socket.emit('R_REGISTER_UNSUCCESS', {data : '0'});
		}else {
			R_REGISTER_SUCCESS (currentUser,socket);
			//userBase.createNewUserBase(currentUser);
		}
	});
	
}
//FFFFFFFF: new TextChatColor
function R_REGISTER_SUCCESS (currentUser,socket) {
	database.query( "INSERT INTO `users` (`UserID`,`UserName`,`UserPass`,`password_recover_key`,`password_recover_key_expire`,`UserEmail`,`Diamond`,`timeLogin`,`timeLogout`,`timeResetMine`, `ColorChatWorld`) VALUES ('"+""+"','"
		+currentUser.name+"','"+currentUser.password+"','"+""+"','"+""+"','"+currentUser.email+"','"+1000+"','"+0+"','"+0+"','"+0+"','FFFFFFFF')",function (error,result) {			
			if (!!error){DetailError = ('register: Error insertUser '+ currentUser.name);functions.writeLogErrror(DetailError);}
			socket.emit('R_REGISTER_SUCCESS', {message : '1'});
			console.log('đang ki thanh cong: '+currentUser.name);
			R_USER_REGISTER (currentUser,socket);
			sendMail.sendMailRegister(currentUser);
		});	
}
function R_USER_REGISTER (currentUser,socket) {
	socket.emit('R_USER_REGISTER', { UserName : currentUser.name,});
}

