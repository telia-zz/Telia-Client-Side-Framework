// JavaScript Document

<!-- For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. --> 
var swfVersionStr = "10.0.0";
<!-- To use express install, set to playerProductInstall.swf, otherwise the empty string. -->
var xiSwfUrlStr = "http://static.telia.dk/11_facelift/flash/hastighedsmaaler/playerProductInstall.swf";
var flashvars = {};
flashvars.downloadSize = 5000;
flashvars.timeScale = 40;
flashvars.numItems = 3;
flashvars.type1 = "Telia 4G";
flashvars.hastighed1 = 35;
flashvars.type2 = "ADSL";
flashvars.hastighed2 = 10;
flashvars.type3 = "3G";
flashvars.hastighed3 = 3.5;
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
	"http://static.telia.dk/11_facelift/flash/hastighedsmaaler/hastighedsmaaler_orange.swf", "hastighedHdfilm", 
	"700", 56+(flashvars.numItems*34), 
	swfVersionStr, xiSwfUrlStr, 
	flashvars, params, attributes);
<!-- JavaScript enabled so display the flashContent div in case it is not replaced with a swf object. -->
swfobject.createCSS("#hastighedHdfilm", "display:block;text-align:left;");