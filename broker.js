/*
class IotServer {
	settings = {
		port:1883
		}
	mqttServer = null
	tunnel = null
	

	onNewClientConnected(client){
		console.log("new client connected: "+client)
	}
	onPublished(packet, client){
		console.log("new message from "+client+": "+packet.payload)
	}
	
	constructor(){
		this.mqttServer = new mosca.Server(this.settings)
		this.mqttServer.on('ready', function(){
			console.log("mqtt server ready");
			});
		this.mqttServer.on('clientConnected', this.onNewClientConnected);
		this.mqttServer.on('published', this.onPublished);			
	}
}

var server = new IotServer();
while (1);
*/
var mosca = require('mosca');
var settings = {
		port:1883
		}

function hex2a(hexx) {
	var hex = hexx.toString();//force conversion
	var str = '';
	for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return str;
}

function onNewClientConnected(client){
	console.log("new client connected: ", client.id);
}	
function onPublished(packet){
	//console.log("new message from : ", client.id);
	console.log("payload:", packet.payload.toString('ascii'));
}
	

var server = new mosca.Server(settings);

server.on('ready', function(){
console.log("ready");
});
server.on('clientConnected', onNewClientConnected);
server.on('published', onPublished);