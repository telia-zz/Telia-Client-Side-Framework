var flashvars = {
	autoPlay: true,
	movie: ''
};
var params = {
	menu: "false",
	scale: "Scale",
	allowFullscreen: "true",
	allowScriptAccess: "always",
	bgcolor: "#373737",
	wmode: "transparent"
};
var attributes = {
	id:"videodiv"
};

function playVideo(videoFile)
{
	$('#videodiv').html("");
		
	flashvars.movie = 'http://static.telia.dk/11_facelift/images/mobilaftale/' + videoFile;
	swfobject.embedSWF("http://static.telia.dk/11_facelift/images/mobilaftale/VideoPlayerLite.swf", "videodiv", "270", "153", "10.0.0", "http://static.telia.dk/11_facelift/images/mobilaftale/expressInstall.swf", flashvars, params, attributes);
}