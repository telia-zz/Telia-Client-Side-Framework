// JavaScript Document

var flashvars = {};
flashvars.videoWidth = 397;
flashvars.videoHeight = 254;
flashvars.videoURL = "http://towelhead.dk.telia.net/banners/jobsite/movie_christian_02.f4v";
var params = {
	wmode: "transparent"
	};
var attributes = {};
var datetime = escape((new Date()).getTime());
swfobject.embedSWF(location.protocol + "//static.telia.dk/11_facelift/flash/VideoPlayerLite.swf?cachebuster=" + datetime, "videodiv", flashvars.videoWidth, flashvars.videoHeight, "9.0.0", false, flashvars, params, attributes);