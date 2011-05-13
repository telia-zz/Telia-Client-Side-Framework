// JavaScript Document

<!-- For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. --> 
var swfVersionStr = "10.0.0";
<!-- To use express install, set to playerProductInstall.swf, otherwise the empty string. -->
var xiSwfUrlStr = "http://static.telia.dk/11_facelift/flash/hastighedsmaaler/playerProductInstall.swf";
var flashvars = {};
flashvars.downloadSize = 4;
flashvars.timeScale = 1;
flashvars.numItems = 4;
flashvars.type1 = "80 Mbps";
flashvars.hastighed1 = 80;
flashvars.type2 = "16 Mbps";
flashvars.hastighed2 = 16;
flashvars.type3 = "6 Mbps";
flashvars.hastighed3 = 6;
flashvars.type4 = "2 Mbps";
flashvars.hastighed4 = 2;			
var params = {};
params.quality = "high";
params.bgcolor = "#ffffff";
params.allowscriptaccess = "sameDomain";
params.allowfullscreen = "true";
params.wmode = "transparent";
var attributes = {};
attributes.id = "hastighedsmaaler";
attributes.name = "hastighedsmaaler";
attributes.align = "top";
swfobject.embedSWF(
	"http://static.telia.dk/11_facelift/flash/hastighedsmaaler/hastighedsmaaler_blue.swf", "hastighedSang", 
	"700", 56+(flashvars.numItems*34), 
	swfVersionStr, xiSwfUrlStr, 
	flashvars, params, attributes);
<!-- JavaScript enabled so display the flashContent div in case it is not replaced with a swf object. -->
swfobject.createCSS("#hastighedSang", "display:block;text-align:left;");