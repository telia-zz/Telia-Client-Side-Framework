var Telia = Telia || {};
/*
 * Load and insert 1 movie from teliaTirsdagXml
 */
Telia.get2for1Bio = function(){
	$.get("/film/tirsdag/xml", function(xml){
		var $xml = $(xml);
		////console.dir($xml);
		$xml.find('bio').each(function(){
			var title = $(this).find('title').text();
			var cover = $(this).find('cover').text();
			var video = $(this).find('video').text();
			
			$('<img src="' + cover + '" alt="' + title + '" />')
				.appendTo('#bio')
				.data('videoUri', video);
			// set the title in the above p
			$('#bio').prev().text( title );
				
			$('#bio .teliaTirsdag-cover').click(function(e){
				e.stopPropagation();
				lightBox('video', {
					  videoWidth: 475
					, videoHeight: 319
					, params: {
						wmode: 'transparent'
					}
					, videoURL: $(this).next().data('videoUri')
				}, 615);
			});
		});
	}, 'xml');
}
/*
 * Load and insert 5 movies from teliaTirsdagXml
 */
Telia.get5Movies = function(){
	// prod uri: "/film/tirsdag/xml"
	$.get("/film/tirsdag/xml", function(xml){
		jQuery(function($) {
			//console.dir(xml);
			var $xml = $(xml), htmlLi = '';
			$xml.find('movie').each(function(){
				var title = $(this).find('title').text();
				var cover = $(this).find('cover').text();
				var video = $(this).find('video').text();
		
				htmlLi = '<li>'
						+ '<div class="teliaTirsdag-cover"></div><img src="'
						+ cover
						+ '" alt="'
						+ title
						+ '" /><h4>'
						+ title
						+ '</h4></li>';
	
				$('.teliaTirsdag-filmList').append(htmlLi);
				$('.teliaTirsdag-filmList li').last().data('videoUri', video);
			});
			// handle click event if li is clicked
			$('.teliaTirsdag-filmList li').click(function(e){
				e.preventDefault();
				lightBox('video', {
					  videoWidth: 475
					, videoHeight: 319
					, params: {
						wmode: 'transparent'
					}
					, videoURL: $(this).data('videoUri')
				}, 615);
			});
			// empty lightBox when it's closed
			$('.lightBox').bind('close', function(e){
				$('#x-videoplayer').remove();
			});
		});
	}, 'xml');
}
/**
 * Get 2 movies from 2for1dvd.dk through JSONP
 */
Telia.getTwooferDvds = function(){
	$.getJSON(
		'http://telia.2for1dvd.dk/api/rest/teaser?apikey=85bebfd34686ff672c777b&format=json&callback=?'
	  , function(d,jXhr){
		  	var twooferHtml = '';
			for (var i in d.products){
				var prod = d.products[i];
				twooferHtml += '<div class="fordeleCoverBg">';
				twooferHtml += '<a href="';
				twooferHtml += prod.url;
				twooferHtml += '"><img src="';
				twooferHtml += prod.thumb;//.replace(/^https:|http:/, location.protocol);
				twooferHtml += '" alt="';
				twooferHtml += prod.title;
				twooferHtml += '" /></a></div>';
			}
			$('#twoofer').empty().append(twooferHtml);
			
			$('#twoofer a').mouseenter(function(){
				$(this).stop(true).fadeTo(250, 0.3);
				$('#twoofer').prev().text(
					$(this).find('img').attr('alt')
				);
			});
			$('#twoofer a').mouseleave(function(){
				$(this).stop(true).fadeTo(250, 1);
				$('#twoofer').prev().empty();
			});			
	}, 'jsonp');
}

/** Get the bio list from JSON source
 * And create hover and active state for bio list
 * Test uri: '11_facelift/json/biolist.json'
 * location.protocol + '//telia.dk/film/tirsdag/biolist'
 */
Telia.getBioList = function(){
	var cinemas = [], order = ['K', 'S', 'F', 'J'], areas = [];
	$.getJSON(location.protocol + '//telia.dk/film/tirsdag/biolist', function(data, status){
		$.each(data, function(key, val) {
			var index = $.inArray(key.match(/^./)[0], order);
			areas[index] = '<li>' + key + '</li>';
			for(var i = 0; i < val.length; i++){
				cinemas[key] = val;
			}			
		});
		createList(areas);
		addBehavior();
	});
	function createList(list, eq){
		eq = eq || 0;
		var $ul;
		
		switch (eq){
			case 0: 
				$ul = $('<ul/>', { html: list.join('')});
				break;
			case 1:
				var newList = [];
				for(var i = 0; i < list.length; i++){
					newList.push('<li>' +  list[i].name + '</li>');
				}
				$ul = $('<ul/>', { html: newList.join('')});
				break;
			case 2:
				$ul =	'<div class="vcard">' +
							'<h2 class="org fn">'+ list[0].name +'</h2>' +
							'<div class="horizontalDevider"><div class="horizontalDeviderEndLeft"></div><div class="horizontalDeviderEndRight"></div><div class="clear"></div></div>' +
							'<p class="adr"><span class="street-address">'+ list[0].adr +'</span><br/>' +
								'<span class="postal-code">'+ list[0].postal +'</span> <span class="locality">'+ list[0].locality +'</span>' +
							'</p>' +
							'<div class="horizontalDevider"><div class="horizontalDeviderEndLeft"></div><div class="horizontalDeviderEndRight"></div><div class="clear"></div></div>' +
							'<p>' +
								'Tlf: <span class="tel">'+ list[0].tel +'</span><br/>' +
								list[0].url +
								'<br/><br/>' + list[0].info +
							'</p>' +
						'</div>';
				$ul = $($ul);
				break;
		}
		$('.bio-list tbody td:eq(' + eq + ')').empty(); 
		$ul.css('width', 0).appendTo('.bio-list tbody td:eq(' + eq + ')').animate({ width:170 });
		$('.bio-list tbody td:eq(' + eq + ') li:odd').addClass('odd');
	}
	function handleArrow(arrow, li){
		if(!li){ return; }
		arrow.data('li', li);
		arrow.css({
			'top': $(li).position().top
		  , 'left': $(li).position().left
		}).text(li.innerHTML)
	}
	function handleClick(li){
		if(!li){ return; }
		
		var index = $(li).parents('td').get(0).cellIndex + 1;
		var list = cinemas[$(li).text()] ||
			$.grep(
				cinemas[$('.bio-list tbody td:eq(0) .active').text()]
				, function(el,i){
					return el.name == li.innerHTML;
			});
		
		
		// remove col2 active arrow if the user clicked in col1
		if(index === 1){
			$('.active-arrow.col2').css('left', -9999);
			// used to get the list when a cinema is shown
			$('.bio-list tbody td:eq(0) .active').removeClass('active');
			$(li).addClass('active');
		}
		handleArrow($('.active-arrow.col' + index), li);
		
		createList( list, index );
	}
	function addBehavior(){
		$('.bio-list li').live({
			mouseenter: function(e){
				e.preventDefault();
				e.stopPropagation();
				handleArrow($('.hover-arrow'), e.currentTarget)
			}
		});
		$('.hover-arrow').click(function(e){
			e.preventDefault();
			e.stopPropagation();
			handleClick($(this).data('li'));
		});
		$('.hover-arrow').mouseleave(function(){
			$('.hover-arrow').css('left', -9999);
		});
		$(window).resize(function(){
			if(!!$('.active-arrow.col1').data('li')) {
				handleArrow($('.active-arrow.col1'), $('.active-arrow.col1').data('li'));
			}
			if(!!$('.active-arrow.col2').data('li')) {
				handleArrow($('.active-arrow.col2'), $('.active-arrow.col2').data('li'));
			}
			
		});
	}
}

/***
 * tuesday generator - only for FF
 * copy to dateData in Telia.prepareInviteForm
 *//*
function createDates(year, el){
	var n = Telia.getTuesday();
	var tObj = '{tuesdays:['
	do {
	  tObj +='"' + n.toLocaleFormat("%d-%m-%Y") + '",';
	  n.setDate(n.getDate() + 7);
	} while (n.getFullYear() != year);
	// remove trailing comma
	tObj = tObj.replace(/,$/, '');
	tObj += ']};';
	if(el){
		$(el).append(tObj);
	} else {
		console.log(tObj);
	}	
}*/

Telia.prepareInviteForm = function(){
	// public methods (this is the Telia namespace/object)
	this.getTuesday = function(){
		var now = new Date();
		return new Date( now.getFullYear(),
							now.getMonth(), 
							now.getDate() + ( now.getDay() <= 2 ? 2 : 9 ) - now.getDay() );
	}
	
	jQuery(function(){
		// private methods
		function formatDate(date){
			function pad(n){return n<10 ? '0'+n : n;}
			return pad(date.getDate()) + '-' +
				    pad(date.getMonth()+1) + '-' +
				    pad(date.getFullYear());
		}
		function isToday(tuesday){
			return tuesday == formatDate(new Date());
		}
		function getNextThuesdays(num){
			var tuesday = formatDate(
				Telia.getTuesday()
				),
	        	start = $.inArray(tuesday, dateData.tuesdays);
			return dateData.tuesdays.slice(start, start+num);
		}
	
		var dateData = {tuesdays:["17-05-2011","24-05-2011","31-05-2011","07-06-2011","14-06-2011","21-06-2011","28-06-2011","05-07-2011","12-07-2011","19-07-2011","26-07-2011","02-08-2011","09-08-2011","16-08-2011","23-08-2011","30-08-2011","06-09-2011","13-09-2011","20-09-2011","27-09-2011","04-10-2011","11-10-2011","18-10-2011","25-10-2011","01-11-2011","08-11-2011","15-11-2011","22-11-2011","29-11-2011","06-12-2011","13-12-2011","20-12-2011","27-12-2011","03-01-2012","10-01-2012","17-01-2012","24-01-2012","31-01-2012","07-02-2012","14-02-2012","21-02-2012","28-02-2012","06-03-2012","13-03-2012","20-03-2012","27-03-2012","03-04-2012","10-04-2012","17-04-2012","24-04-2012","01-05-2012","08-05-2012","15-05-2012","22-05-2012","29-05-2012","05-06-2012","12-06-2012","19-06-2012","26-06-2012","03-07-2012","10-07-2012","17-07-2012","24-07-2012","31-07-2012","07-08-2012","14-08-2012","21-08-2012","28-08-2012","04-09-2012","11-09-2012","18-09-2012","25-09-2012","02-10-2012","09-10-2012","16-10-2012","23-10-2012","30-10-2012","06-11-2012","13-11-2012","20-11-2012","27-11-2012","04-12-2012","11-12-2012","18-12-2012","25-12-2012","01-01-2013","08-01-2013","15-01-2013","22-01-2013","29-01-2013","05-02-2013","12-02-2013","19-02-2013","26-02-2013","05-03-2013","12-03-2013","19-03-2013","26-03-2013","02-04-2013","09-04-2013","16-04-2013","23-04-2013","30-04-2013","07-05-2013","14-05-2013","21-05-2013","28-05-2013","04-06-2013","11-06-2013","18-06-2013","25-06-2013","02-07-2013","09-07-2013","16-07-2013","23-07-2013","30-07-2013","06-08-2013","13-08-2013","20-08-2013","27-08-2013","03-09-2013","10-09-2013","17-09-2013","24-09-2013","01-10-2013","08-10-2013","15-10-2013","22-10-2013","29-10-2013","05-11-2013","12-11-2013","19-11-2013","26-11-2013","03-12-2013","10-12-2013","17-12-2013","24-12-2013","31-12-2013","07-01-2014","14-01-2014","21-01-2014","28-01-2014","04-02-2014","11-02-2014","18-02-2014","25-02-2014","04-03-2014","11-03-2014","18-03-2014","25-03-2014","01-04-2014","08-04-2014","15-04-2014","22-04-2014","29-04-2014","06-05-2014","13-05-2014","20-05-2014","27-05-2014","03-06-2014","10-06-2014","17-06-2014","24-06-2014","01-07-2014","08-07-2014","15-07-2014","22-07-2014","29-07-2014","05-08-2014","12-08-2014","19-08-2014","26-08-2014","02-09-2014","09-09-2014","16-09-2014","23-09-2014","30-09-2014","07-10-2014","14-10-2014","21-10-2014","28-10-2014","04-11-2014","11-11-2014","18-11-2014","25-11-2014","02-12-2014","09-12-2014","16-12-2014","23-12-2014","30-12-2014","06-01-2015"]};
		// behaviour
		$('#invite-friend').click(function(e){
	    	e.preventDefault();
	    	lightBox('html', '#invite-form', { width: 650, height: 470 });
	    	// set the width of the select boxes
	    	$('.dropdown').trigger('setWidth');
	    	
		});
		$('#invite-form form').submit(function(e){
			e.preventDefault();
			if(validate(e)){
				function loadAni(remove){
					if(remove){
						$('.wrap2', '.lightBox').removeClass('loader');;
					} else {
						$('.wrap2', '.lightBox').addClass('loader');
					}
				}
				$('#invite-form').fadeTo(500, 0);
				// show loader gif
				loadAni();				
				
				$.ajax($(this).attr('action'), {
					data:  $(this).serialize()
				  , type: 'POST'
				  ,	error: function(xhr, s, error){
				  		console.dir(xhr.getAllResponseHeaders());
				  		//console.dir(xhr.statusCode());
				  		loadAni(true);
						$('#invite-form').fadeTo(500, 1);
						displayError(['Der er sket en fejl og din invitation er ikke sendt.']);
					}
				  ,	success: function(d, s, xhr){
				  		console.log(s);
				  }
				, statusCode: {
					302: function(a){
						console.log('302', a);
					}
				  }
				});
			//	jQuery.post($(this).attr('action'), $(this).serialize(), function(d, s, xhr){
			//		console.log(s);
			//	});
			} else {
				return false;
			}
		});
		$('#invite-send').click(function(){
			$(this).parents('form').submit();
		});
		$('#invite-form input').keyup(function(e) {
			if (e.keyCode == 13) {
				$('#invite-form form').submit();
			}
		});

		// internal functions
		function validate(e){
			var errors = [];
			$('#invite-form input[type="text"]').each(function(i){
				// check for missing input
				if($(this).val().length == 0){
					animateInput(this);
					errors.push(
						$('label[for="'
						+ $(this).attr('name')
						+ '"]', '#invite-form').text()						
						+ ' mangler.');
				}
				// check email address
				if( /email/.test($(this).attr('name')) && !/^.+@.+\..{2,}$/.test($(this).val()) ){
					animateInput(this);
					errors.push(
						$('label[for="'
						+ $(this).attr('name')
						+ '"]', '#invite-form').text()						
						+ ' er ugyldig.');
				}
			});
			return errors.length > 0 ? (displayError(errors), false) : (hideError(), true);
		}
		function hideError(){
			$('#invite-form .error').fadeTo(1000, 0);
		}
		function displayError(errors){
			$('#invite-form .error')
				.empty()
				.append('<li>' + errors.join('</li><li>') )
				.removeClass('dnone')
				.fadeTo(1000, 1);
		}
		function animateInput(input){
			$(input).parents('.textbox').effect('shake', { distance: 8, duration: 100, times: 2 }, 100);
		}
		
		// populate the date select on DOM ready
		$(
			$.map(getNextThuesdays(4),
				function(date, i){
					return ('<option value="'+ date +'">'
							+ (i === 0 && isToday(date) ? 'I aften' : date)
							+ '</option>');
				}
			).join('')
		).appendTo('#S1398_tday');
		// transform the select
		$('#S1398_tday').trigger('transform');
	});
}