// JavaScript Document

var flashvars = {};
flashvars.videoWidth = 270;
flashvars.videoHeight = 183;
flashvars.videoURL = "http://static.telia.dk/11_facelift/images/mobilaftale/Mobilaftale_final_366x250_PNG.flv";
var params = {
	wmode: "transparent"
	};
var attributes = {};
var datetime = escape((new Date()).getTime());
swfobject.embedSWF(location.protocol + "//static.telia.dk/11_facelift/flash/VideoPlayerLite.swf?cachebuster=" + datetime, "videodiv", flashvars.videoWidth, flashvars.videoHeight, "9.0.0", false, flashvars, params, attributes);


