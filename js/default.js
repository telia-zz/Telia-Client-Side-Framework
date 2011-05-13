var activeHero, bannerRotateInterval, heroInterval, heroSecondsToChange, heroSecondsToFade, heroNavigation, interval, undefined, Telia = Telia || {};

jQuery(document).ready(function ($) {
	
	renderTopMenu();
	
	Telia.toggleValue('#all_query');
	
    /* Webshop foldout */
    $('.actionArea .foldout').mouseover(function () {
        $('.siteHeader > .navigationOuter .navigation .foldout').removeClass('active');
        $('.foldoutArea').hide();
        $(this).next().fadeIn(200);
    });

    $('.actionArea .foldoutArea').mouseleave(function () {
        senderObject = $(this);
        fadeout(senderObject);
    });

    $('.actionArea .foldoutArea').mouseover(function () {
        clearTimer(interval);
    });


    /* Navigation foldout */
    $('.siteHeader > .navigationOuter .navigation > ul > li > a').mouseover(function () {
        clearTimer(interval);
        if ($(this).next().css('display') == 'none') {
            $('.siteHeader > .navigationOuter .navigation > ul > li > a').removeClass('active');
            $('.foldoutArea').hide();
            $(this).addClass('active');
            $(this).next().fadeIn(200);
        }
        else if ($(this).parent().children().length == 1) {
            $('.siteHeader > .navigationOuter .navigation > ul > li > a').removeClass('active');
            $('.foldoutArea').hide();
            $(this).addClass('active');
        }
    });

    $('.siteHeader > .navigationOuter .navigation .foldoutArea').mouseover(function () {
        clearTimer(interval);
    });

    $('.siteHeader > .navigationOuter .navigation > ul > li > a').mouseleave(function () {
        if ($(this).hasClass('foldout')) {
            senderObject = $(this).next();
            fadeout(senderObject);
        }
        else {
            $(this).removeClass('active');
        }
    });

    $('.siteHeader > .navigationOuter .navigation .foldoutArea').mouseleave(function () {
        senderObject = $(this);
        fadeout(senderObject);
    });
	
	/* hero */
	heroSecondsToChange = 4000;
	heroSecondsToFade = 500;
	loadHeroElements();
	$('.hero .navigation > a').click(function() {
		if(!$(this).hasClass('active')) {
			activateHero($(this));
		}
		
		return false;
	});
	
	$('.hero .navigation > a, .hero .items > .item').mouseover(function() {
		clearTimer(heroInterval);
	});
	
	$('.hero .navigation > a, .hero .items > .item').mouseleave(function() {
		heroCounter();
	});
	
	/* banner rotate */
	if($('.bannerRotate').length != 0) {
		$('.bannerRotate').each(function(i) {
			bannerRotate($('.bannerRotate:eq(' + i + ')'));
		});
	}
	
	$('.bannerRotate').children().mouseover(function() {
		clearTimer(bannerRotateInterval);
	});
	
	$('.bannerRotate').children().mouseleave(function() {
		bannerRotate($(this).parent());
	});
	
	/* ie6 warning */
	
	if ($.browser.msie && $.browser.version < 7) {
		if(document.cookie.indexOf('ie6warning=true') == -1)
		{
			var ie6content = '<div class="content ie6">';
            ie6content += '<h2>Beklager. Vi kan se at du benytter en &#230;ldre version af<br />Internet Explorer</h2>';
			ie6content += '<p>Telia.dk er designet og optimeret til brug med nyere browsere. For at kunne nyde vores side<br />fuldt ud, beder vi dig om at opdatere din browser til en nyere version.</p>';
            ie6content += '<h3>Du kan frit v&#230;lge en browser efter eget valg, fra listen herunder:</h3>';
            ie6content += '<ul class="browsers">';
            ie6content += '<li><a href="http://www.mozilla.com/" class="firefox" target="_blank">Download<br />Firefox</a></li>';
            ie6content += '<li><a href="http://www.google.com/chrome/" class="chrome" target="_blank">Download<br />Chrome</a></li>';
            ie6content += '<li><a href="http://www.apple.com/safari/download/" class="safari" target="_blank">Download<br />Safari</a></li>';
            ie6content += '<li><a href="http://www.microsoft.dk/ie" class="ie" target="_blank">Download<br />Internet Explorer</a></li>';
            ie6content += '<li><a href="http://www.opera.com/" class="opera" target="_blank">Download<br />Opera</a></li>';
            ie6content += '</ul>';
            ie6content += '<p><i>Med dit valg f&#248;lger samtidig en hurtigere, og mere sikker weboplevelse.</i></p>';
            ie6content += '</div>';
			lightBox('html', ie6content, 850);
			document.cookie = 'ie6warning=true; path=/';
		}
	}
	
	/* form elements */
	$('.checkbox').click(function() {
		$(this).toggleClass('active');
		
		if($(this).hasClass('active')) {
			$(this).next().attr('checked', true);
		}
		else {
			$(this).next().attr('checked', false);
		}
	});
	
	$('.radiobutton').click(function() {
		if(!$(this).hasClass('active'))
		{
			$(this).siblings('.radiobutton.active').removeClass('active');
			$(this).addClass('active');
			
			var realRadiobutton = $(this).attr('rb');
			var rbGroup = $(this).attr('rbgroup');
			$('input[name='+ rbGroup +']').each(function() {
				$(this).attr('checked', false);
			});
			
			$('input[name='+ rbGroup +']#' + realRadiobutton).attr('checked', true);
		}
	});
	
	$('.dropdown').each(function(index, element) {
		// helper function
		function dropdownAni(el){
			el.slideDown(100).find('.bottom-bg').effect('bounce', { times: 2, distance:4 }, 200);
		}
		function dropdownHide(el){
			el.slideUp(100);
		}
		// timer id for mouseleave/mouseenter events
		var mouseoutId;
		
		$(this).bind('transform', function(){
			
			// remove old transformation elements
			$(this).find('.wrap1 .dropdown-list, .wrap1 label').remove();
			/*
			<select style="display: none;">
				<option value="0">4G</option>
				<option value="1">Abonnementer og services</option>
			</select>
			<div class="dropdown-list">
				<div class="left-bg">
					<ul class="right-bg">
						<li>4G</li>
						<li>Abonnementer og services</li>
						<li class="bottom-bg"></li>
					</ul>
				</div>
			</div>
			<div class="label">4G</div>
			*/
			// create DOM elements
			var html = [], firstChild, lastChildIndex = $('select', this).children().length -1;
			html.push('<div class="dropdown-list">');
				html.push('<div class="left-bg">');
					html.push('<ul class="right-bg">');
						$(this).find('select').children().map(function(i, el){
							html.push('<li>');
								html.push(el.innerHTML);
							html.push('</li>');
							if(i === 0){ firstChild = el.innerHTML; }
							if(i === lastChildIndex){
								html.push('<div class="bottom-bg"></div>');
							}
						});
					html.push('</ul>');
				html.push('</div>');
			html.push('</div>');
			html.push('<label>');
				html.push(firstChild);
			html.push('</label>');
			
			$('.wrap1', this).append(html.join(''));
			
			// hide the original select
			$(this).find('select').hide();
			
			// fire the transformed event - e.g. the transformation is finish
			$(this).trigger('transformed');
		});
		
		// bind an setWidth method to each .dropdown, that will set
		// the width of the outer div .dropdown to match the inner select width 
		$(this).bind('setWidth', function(){
			$(this).width(
				$(this).find('select').outerWidth(true)
			);
			// set the size of all li elements
			$(this).find('li').width($(this).width()-12);
		});
		
		$(this).click(function() {
			if($('.dropdown-list', this).css('display') == 'none'){
				dropdownAni( $('.dropdown-list', this) );
				mouseoutId = setTimeout(function(){
					dropdownHide( $('.dropdown-list', element) );
				}, 1000);
			}
		});
		// when the transformed event is fired you can interact with the new DOM elements
		$(this).bind('transformed', function(){
			// handle when clicked
			$('li', this).click(function(e){
				dropdownHide( $(this).parents('.dropdown-list') );
				if($(e.target).is('li')){
					$('select', element).val(e.target.innerHTML);
					$('label', element).text(e.target.innerHTML);
				}
				$('select', this).trigger('change', [e.target]);
				return false;
			});
			
			$('ul', this).mouseleave(function(){
				mouseoutId = setTimeout(function(){
					dropdownHide( $('.dropdown-list', element) );
				}, 500);
			});
			
			$('ul', this).mouseenter(function(){
				clearTimeout(mouseoutId);
			});

		});

/*		$('select', this).bind('change', function(e, li){
			console.dir(this);
		});
*/		
	});
	// trigger the transformation - if needed you can trigger it again. E.i. with dynamic select options
	$('.dropdown').trigger('transform');
	
});

var clearTimer = function (intervalToClear) {
    clearInterval(intervalToClear);
    delete intervalToClear;
}

var fadeout = function (sender) {
    clearTimer(interval);
    interval = self.setInterval(function () {
        sender.fadeOut(200);
        sender.prev().removeClass('active');
    }, 500);
}

var loadHeroElements = function () {
	if ($('.hero').length > 0) {
		var heroElements = $('.hero > .items > .item').length;
		heroNavigation = $('.hero > .navigation');
		
		$('.hero > .items > .item:first').addClass('active');
		
		for (i = 0; i < heroElements; i++) {
			var newlink = document.createElement('a'); 
			$(newlink).attr('href', '');
			
			if(i == 0) {
				$(newlink).addClass('active');
			}
			
			$(newlink).appendTo(heroNavigation);
		}
		
		heroCounter();
	}
}

var heroCounter = function () {
	clearTimer(heroInterval);
	heroInterval = self.setInterval(function () {
        var hero;
		if(($('.hero > .navigation > a.active').index() + 1) == $('.hero > .navigation > a').length) {
			hero = $('.hero > .navigation > a:first');
		}
		else {
			hero = $('.hero > .navigation > a.active').next();
		}
		activateHero(hero);
    }, heroSecondsToChange);
}

var activateHero = function (sender) {
	activeHero = $('.hero .navigation a.active');
	chosenHeroIndex = sender == undefined ? activeHero.index() : sender.index();
	$('.hero .navigation a').removeClass('active');
	$('.hero .items .item.active').animate({
		opacity: 0
	}, heroSecondsToFade, function() {
		$(this).removeClass('active');
	});
	$('.hero .items .item:nth-child(' + (chosenHeroIndex + 1) + ')').animate({
		opacity: 1
	},heroSecondsToFade, function() {
		$(this).addClass('active')
	});
	sender.addClass('active');
	heroCounter();
}

var bannerRotate = function(sender) {
	clearTimer(bannerRotateInterval);
	bannerRotateInterval = self.setInterval(function() {
		var bannerToRotate;
		if($('.active', sender).index() + 1 == sender.children().length) {
			bannerToRotate = sender.children().first();
		}
		else {
			bannerToRotate = $('.active', sender).next();
		}
		
		$('.active', sender).animate({
			opacity: 0
		}, 500, function() {
			$(this).removeClass('active');
		});
		
		bannerToRotate.animate({
			opacity: 1
		}, 500, function() {
			$(this).addClass('active');
		});
		
		bannerRotate(sender)
	}, 10000);
}

/* lightbox */
jQuery(function($){
	$('.lightBoxAbs .close').click(function() {
		$('.lightBox').trigger('close');
	});
	
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('.lightBox').trigger('close');			
		}   
	});
	
	$('.lightBox').bind('close', function(e){
		$('.shadow').hide();
		$('.lightBoxAbs').hide();
		// experimental empty
	//	$('.lightBox > .contentWrapper > .wrap1 > .wrap2').empty();
	});
});
/* Creates a Lightbox
 * If you want to remove content from the lightbox when it's closed you bind to the close event on the lightbox class.
 * E.g. $('.lightbox').bind('close', function(event){ $('.lightBox > .contentWrapper > .wrap1 > .wrap2').empty(); });
 *
 * @container if type is "video" then the container is an object with the following properties: videoWidth, videoHeight, videoURL and a params object *
 */
var lightBox = function(type, container, size) {
	// some backwards compatibility stuff
	size = typeof(size) == 'object' ? size : { width: size || 500 };

	var lightBoxContainer = $('.lightBox > .contentWrapper > .wrap1 > .wrap2');
	$('.lightBox').attr('class', 'lightBox ' + type);
	$('.lightBox').css(size);
	switch (type){
		case 'html':
			var html = $(container), guid = Math.ceil(Math.random()*0.5*1000);
			// remember the pos of the html element
			lightBoxContainer.data(html, 
				html.parent().attr('id', 'lhtml'+guid)
			);
			html.appendTo(lightBoxContainer).height(size.height - 199);
			// move the html element back when the lightbox close
			$('.lightBox').bind('close', function(){
				$('#lhtml'+guid).append(html);
			});
			break;
		case 'video':
			if( lightBoxContainer.find('#x-videoplayer').length === 0 ){
				lightBoxContainer.append('<div id="x-videoplayer" />');
			}
			$('.lightBox > .contentWrapper > .wrap1 > .wrap2').addClass('loader');
			swfobject.embedSWF(
				  "http://static.telia.dk/11_facelift/flash/VideoPlayerLite.swf"
				, 'x-videoplayer'
				, container.videoWidth
				, container.videoHeight
				, "9.0.0"
				, location.protocol + "//static.telia.dk/ajax.googleapis.com/swfobject/2.2/expressInstall.swf"
				, {
					  videoWidth : container.videoWidth
					, videoHeight : container.videoHeight
					, videoURL : container.videoURL
				}
				, container.params
				, {}
				, function(e){
					setTimeout(function(){
						$('.lightBox > .contentWrapper > .wrap1 > .wrap2').removeClass('loader');
					}, 1000);
				}
			)
			break;
		default:
			$('#' + container + ' .content').appendTo(lightBoxContainer);
			break;
	}

	$('.shadow').show();
	$('.lightBoxAbs').show();
}

var renderTopMenu = function() {
	var pathString = location.pathname;
	var activeTopMenuItem;
	
	if(pathString.indexOf('/privat/selvbetjening/') != -1) {
		activeTopMenuItem = locateActiveTopMenuItem("/mobil/");
	}
	else if(pathString.indexOf('/erhverv/selvbetjening/') != -1) {
		activeTopMenuItem = locateActiveTopMenuItem("/erhverv/mobil/");
	}
	else {
		activeTopMenuItem = locateActiveTopMenuItem(pathString);
	}

	$(activeTopMenuItem).parents('li').children('a').addClass('chosen');
}

var locateActiveTopMenuItem = function(pathString) {
	var activeTopMenuItem = $('.siteHeader > .navigationOuter > .navigation > ul a[href="' + pathString + '"]'); 
	if(activeTopMenuItem.length == 0)
	{
		filteredPath = pathString.substr(0, pathString.substr(0,pathString.length - 1).lastIndexOf('/') + 1);
		
		if(filteredPath.length > 1)
		{
			activeTopMenuItem = locateActiveTopMenuItem(filteredPath);
		}
	}
	return activeTopMenuItem;
}

/**
 * Checks the browser and adds classes to the body to reflect it.
 */
var browserDetect = function(){		
	var userAgent = navigator.userAgent.toLowerCase();
	$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
	
	// Is this a version of IE?
	if ($.browser.msie) {
		$('body').addClass('browserIE');
		
		// Add the version number
		$('body').addClass('browserIE' + $.browser.version.substring(0, 1));
	}		
	
	// Is this a version of Chrome?
	if ($.browser.chrome) {
	
		$('body').addClass('browserChrome');
		
		//Add the version number
		userAgent = userAgent.substring(userAgent.indexOf('chrome/') + 7);
		userAgent = userAgent.substring(0, 1);
		$('body').addClass('browserChrome' + userAgent);
		
		// If it is chrome then jQuery thinks it's safari so we have to tell it it isn't
		$.browser.safari = false;
	}
	
	// Is this a version of Safari?
	if ($.browser.safari) {
		$('body').addClass('browserSafari');
		
		// Add the version number
		userAgent = userAgent.substring(userAgent.indexOf('version/') + 8);
		userAgent = userAgent.substring(0, 1);
		$('body').addClass('browserSafari' + userAgent);
	}
	
	// Is this a version of Mozilla?
	if ($.browser.mozilla) {
	
		//Is it Firefox?
		if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
			$('body').addClass('browserFirefox');
			
			// Add the version number
			userAgent = userAgent.substring(userAgent.indexOf('firefox/') + 8);
			userAgent = userAgent.substring(0, 1);
			$('body').addClass('browserFirefox' + userAgent);
		}
		// If not then it must be another Mozilla
		else {
			$('body').addClass('browserMozilla');
		}
	}
	
	// Is this a version of Opera?
	if ($.browser.opera) {
		$('body').addClass('browserOpera');
	}
};
jQuery(browserDetect);

Telia.toggleValue = function(elem){
	$(elem).focus(function(e){
		if(this.defaultValue === this.value){
			this.value = "";
		}
	});
	$(elem).blur(function(e){
		if(this.value === ""){
			this.value = this.defaultValue;
		}
	});	
}	