var flashvars = {};

var params = {
	menu: "false",
	scale: "Scale",
	allowFullscreen: "true",
	allowScriptAccess: "always",
	wmode: "transparent",
};
var attributes = {
	id: "flexBeregnerFlash"
};

swfobject.embedSWF("http://static.telia.dk/11_facelift/flash/flexberegner.swf", "flexBeregnerFlash", "700", "244", "10.0.0", "http://static.telia.dk/11_facelift/flash/expressInstall.swf", flashvars, params, attributes);