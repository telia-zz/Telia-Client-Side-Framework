var top10Interval, top10Items, top10ItemsContainer, top10Nav;

jQuery(document).ready(function ($) {
	top10ItemsContainer = $('.top10Smartphones .items');
	top10Items = $('.top10Smartphones .items a.item');
	top10Nav = $('.top10Smartphones ul.navigation');
	
	top10Items.first().addClass('active');
	
	top10Items.each(function(i) {
		var navItem = $('<li />');
		
		if($(this).hasClass('active')) {
			navItem.addClass('active');
		}
		
		var thumbnailContainer = $('<div />');
		
		var thumbnail = $('<img />');
		var bannerSrc = $('img', this).attr('src');
		var bannerText = $('img', this).attr('alt');
		thumbnail.attr('src', bannerSrc.substr(0, bannerSrc.length - 4) + '-thumb.png');
		thumbnail.attr('alt', bannerText);
		thumbnail.appendTo(thumbnailContainer);
		
		thumbnailContainer.appendTo(navItem);
		
		var thumbnailText = $('<p />');
		thumbnailText.text(bannerText);
		thumbnailText.appendTo(navItem);
		
		navItem.appendTo(top10Nav);
	});
	
	top10Timer();
	
	$('.top10Smartphones ul.navigation li').click(function() {
		if(!$(this).hasClass('active')) {
			setTop10Banner($(this));
		}
		
		return false;
	});
	
	$('.top10Smartphones ul.navigation li, .top10Smartphones .items').mouseover(function() {
		clearTimer(top10Interval);
	});
	
	$('.top10Smartphones ul.navigation li, .top10Smartphones .items').mouseleave(function() {
		top10Timer();
	});
});

var setTop10Thumbs = function(sender) {
	$('li', top10Nav).removeClass('active');
	sender.addClass('active');
	console.log(sender.text());
}

var setTop10Banner = function(sender) {
	$('.active', top10ItemsContainer).animate({
		opacity: 0
	}, heroSecondsToFade, function() {
		$(this).removeClass('active');
	});
	
	$('.item:nth-child(' + (sender.index() + 1) + ')', top10ItemsContainer).animate({
		opacity: 1
	}, heroSecondsToFade, function() {
		$(this).addClass('active');
	});
	
	setTop10Thumbs(sender);
}

var top10Timer = function() {
	clearTimer(top10Interval);
	
	top10Interval = self.setInterval(function () {
        var top10Thumbnail;
		if(($('.active', top10Nav).index() + 1) == $('li', top10Nav).length) {
			top10Thumbnail = $('li', top10Nav).first();
		}
		else {
			top10Thumbnail = $('.active', top10Nav).next();
		}
		setTop10Banner(top10Thumbnail);
    }, heroSecondsToChange);
}