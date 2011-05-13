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
		
	flashvars.movie = 'http://towelhead.dk.telia.net/banners/jobsite/' + videoFile;
	swfobject.embedSWF("http://static.telia.dk/09_facelift/gfx/content/jobsite/VideoPlayerLite.swf", "videodiv", "397", "224", "10.0.0", "http://static.telia.dk/09_facelift/gfx/content/jobsite/expressInstall.swf", flashvars, params, attributes);
}