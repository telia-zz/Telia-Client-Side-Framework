var currentMarker, geocoder, map, undefined;
var markersTelia = [];
var markersOther = [];
var hideOthers = true;

jQuery(document).ready(function ($) {
    geocoder = new google.maps.Geocoder({
        language: 'da',
        region: 'dk'
    });
    var latlng = new google.maps.LatLng(56.247826494447345, 11.5191650390625);

    var myOptions = {
        zoom: 7,
        center: latlng,
        mapTypeControl: false,
        scaleControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("gmapsCanvas"), myOptions);

    setMarkers(map);

    google.maps.event.addListener(map, 'zoom_changed', function () {
        for (i = 0; i < markersOther.length; i++) {
            if (map.getZoom() < 11) {
                markersOther[i].setIcon(markersOther[i].iconSmall);
            }
            else {
                markersOther[i].setIcon(markersOther[i].iconLarge);
            }
        }
        for (i = 0; i < markersTelia.length; i++) {
            if (map.getZoom() < 11) {
                markersTelia[i].setIcon(markersTelia[i].iconSmall);
            }
            else {
                markersTelia[i].setIcon(markersTelia[i].iconLarge);
            }
        }
    });

    $('#gmapsLocation').keypress(function (e) {
        if (e.which == 13) {
			setRenderMethod($('#gmapsLocation').val(), latlng);
        }
    });

    $('#gmapsSubmit').click(function () {
        setRenderMethod($('#gmapsLocation').val(), latlng);
    });

    $('.gmapsOption .checkbox').click(function () {
        hideOthers = $(this).hasClass('active');

        for (i = 0; i < markersOther.length; i++) {
            if (!hideOthers) {
                markersOther[i].setMap(map);
            }
            else {
                markersOther[i].setMap(null);
            }
        }

        return false;
    });
	
	$('.box.gmaps').mouseenter(function() {
		if($('h2',this).hasClass('marginBottomNone')) {
			$('h2',this).removeClass('marginBottomNone')
			$('.box.gmaps .form').slideDown('fast').queue();
		}
	});
	
	$('.box.gmaps').mouseleave(function() {
		if(!$(this).hasClass('startup')) {
			$('h2',this).addClass('marginBottomNone')
			$('.box.gmaps .form').slideUp('fast').queue();
		}
	});
});

var setRenderMethod = function(inputValue, latlng) {
	if(inputValue == '')
	{
		map.setCenter(latlng);
		map.setZoom(7);
	}
	else {
		setLocation(inputValue + ' , Danmark');
	}
}

var setMarkers = function (map) {
    $.ajax({
        url: '/omtelia/findforhandler/find_forhandler.xml',
		dataType: 'xml',
        success: function (data) {
            $('shops shop', data).each(function (i) {
                var iconLarge, iconSmall;

                if ($('type', this).text().toLowerCase() == "telia") {
                    iconLarge = 'https://static.telia.dk/11_facelift/images/pins/purple.png';
                    iconSmall = 'https://static.telia.dk/11_facelift/images/pins/purple-small.png';
                }
                else {
                    iconLarge = 'https://static.telia.dk/11_facelift/images/pins/blue.png';
                    iconSmall = 'https://static.telia.dk/11_facelift/images/pins/blue-small.png';
                }

                var latLng = new google.maps.LatLng($('lat', this).text(), $('lng', this).text());
                var shopMarker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: $('name', this).text(),
                    icon: iconSmall
                });

                shopMarker.iconLarge = iconLarge;
                shopMarker.iconSmall = iconSmall;

                if ($('type', this).text().toLowerCase() == "telia") {
                    markersTelia.push(shopMarker);
                }
                else {
                    markersOther.push(shopMarker);
                }

                google.maps.event.addListener(shopMarker, 'click', function () {
                    var infoLatLng;
                    switch (map.getZoom()) {
                        case 0:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 28, latLng.lng());
                            break;
                        case 1:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 25, latLng.lng());
                            break;
                        case 2:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 20, latLng.lng());
                            break;
                        case 3:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 10, latLng.lng());
                            break;
                        case 4:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 5.341184, latLng.lng());
                            break;
                        case 5:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 2.670592, latLng.lng());
                            break;
                        case 6:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 1.335296, latLng.lng());
                            break;
                        case 7:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.667648, latLng.lng());
                            break;
                        case 8:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.333824, latLng.lng());
                            break;
                        case 9:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.166912, latLng.lng());
                            break;
                        case 10:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.083456, latLng.lng());
                            break;
                        case 11:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.041728, latLng.lng());
                            break;
                        case 12:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.020864, latLng.lng());
                            break;
                        case 13:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.010432, latLng.lng());
                            break;
                        case 14:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.005216, latLng.lng());
                            break;
                        case 15:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.002608, latLng.lng());
                            break;
                        case 16:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.001304, latLng.lng());
                            break;
                        case 17:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.000652, latLng.lng());
                            break;
                        case 18:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.000326, latLng.lng());
                            break;
                        case 19:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.000168, latLng.lng());
                            break;
                        case 20:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.000084, latLng.lng());
                            break;
                        case 21:
                            infoLatLng = new google.maps.LatLng(latLng.lat() + 0.000042, latLng.lng());
                            break;
                    }

                    map.panTo(infoLatLng);
                    $(markersOther).each(function (i) {
                        markersOther[i].infowindow.close();
                    });

                    $(markersTelia).each(function (i) {
                        markersTelia[i].infowindow.close();
                    });

                    shopMarker.infowindow.open(map, shopMarker);
                    $('.box.gmaps').addClass('closed').removeClass('startup');
                    $('.box.gmaps h2').addClass('marginBottomNone');
                    $('.box.gmaps .form').slideUp('fast');
                });

                var weekdayMon = $('mon', this).text() == '' ? 'Lukket' : $('mon', this).text();
                var weekdayTue = $('tue', this).text() == '' ? 'Lukket' : $('tue', this).text();
                var weekdayWed = $('wed', this).text() == '' ? 'Lukket' : $('wed', this).text();
                var weekdayThu = $('thu', this).text() == '' ? 'Lukket' : $('thu', this).text();
                var weekdayFri = $('fri', this).text() == '' ? 'Lukket' : $('fri', this).text();
                var weekdaySat = $('sat', this).text() == '' ? 'Lukket' : $('sat', this).text();
                var weekdaySun = $('sun', this).text() == '' ? 'Lukket' : $('sun', this).text();

                var contentString = '<table cellpadding="0" cellspacing="0" border="0" class="gmapsInfoTable">';
                contentString += '<tr>';
                contentString += '<td valign="top" width="150">';
                contentString += '<h3 class="marginTopNone">' + $('name', this).text() + '</h3>';
                contentString += $('address', this).text() + '<br />';
                contentString += $('city', this).text() + '<br />';
                contentString += 'Tlf: ' + $('phone', this).text() + '<br />';

                if ($('fax', this).text() != '') {
                    contentString += 'Fax: ' + $('fax', this).text() + '<br />';
                }

                if ($('email', this).text() != '') {
                    contentString += '<a href="mailto:' + $('email', this).text() + '">' + $('email', this).text() + '</a><br />';
                }

                if ($('manager', this).text() != '') {
                    contentString += '<br />Butikschef:<br />' + $('manager', this).text() + '<br />';
                }

                contentString += '</td>';

                if (weekdayMon == 'Lukket' && weekdayTue == 'Lukket' && weekdayWed == 'Lukket' && weekdayThu == 'Lukket' && weekdayFri == 'Lukket' && weekdaySat == 'Lukket' && weekdaySun == 'Lukket') {
                }
                else {
                    contentString += '<td width="30">&nbsp;</td>';
                    contentString += '<td valign="top">';
                    contentString += '<h3 class="marginTopNone">Åbningstider</h3>';
                    contentString += '<table cellpadding="0" cellspacing="0" border="0" width="150">';
                    contentString += '<tr><td>Man: </td><td width="10">&nbsp;</td><td>' + weekdayMon + '</td></tr>';
                    contentString += '<tr><td>Tir: </td><td width="10">&nbsp;</td><td>' + weekdayTue + '</td></tr>';
                    contentString += '<tr><td>Ons: </td><td width="10">&nbsp;</td><td>' + weekdayWed + '</td></tr>';
                    contentString += '<tr><td>Tor: </td><td width="10">&nbsp;</td><td>' + weekdayThu + '</td></tr>';
                    contentString += '<tr><td>Fre: </td><td width="10">&nbsp;</td><td>' + weekdayFri + '</td></tr>';
                    contentString += '<tr><td>Lør: </td><td width="10">&nbsp;</td><td>' + weekdaySat + '</td></tr>';
                    contentString += '<tr><td>Søn: </td><td width="10">&nbsp;</td><td>' + weekdaySun + '</td></tr>';

                    if ($('notes', this).text() != '') {
                        contentString += '<tr><td colspan="3" style="font-size: 11px;"><br />' + $('notes', this).text() + '</td></tr>';
                    }
                    contentString += '</table>';
                    contentString += '</td>';
                }

                contentString += '</tr>';
                contentString += '</table>';

                shopMarker.infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
            });
        }
    });
}

var setLocation = function(userAddress) {
	$('.box.gmaps .cities, .box.gmaps .error').remove();
	geocoder.geocode( { address: userAddress}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if(results.length == 1) {
			map.setCenter(results[0].geometry.location);
			map.setZoom(14);
			$('#gmapsLocation').val(results[0].formatted_address.replace(', Danmark', ''));
			if(currentMarker == undefined) {
				currentMarker = new google.maps.Marker({
					position: results[0].geometry.location,
					map: map,
					title: 'Din placering',
					icon: 'https://static.telia.dk/11_facelift/images/pins/you-are-here.png'
				});
			}
			else {
				currentMarker.setMap(null);
				
				currentMarker = new google.maps.Marker({
					position: results[0].geometry.location,
					map: map,
					title: 'Din placering',
					icon: 'https://static.telia.dk/11_facelift/images/pins/you-are-here.png'
				});
				
				currentMarker.setMap(map);
			}
		}
		else {
			var cities = $('<div class="cities" />');
			$('<h3 class="marginTopNone marginBottom10px">Vælg resultat</h3>').appendTo(cities);
			var cityList = $('<ul/>').attr('class', 'linkList');
			$(results).each(function(i) {
				var location = results[i].formatted_address.replace(', Danmark', '');
				var cityBullet = $('<li/>');
				var cityLink = $('<a/>')
				.text(location)
				.attr('href', 'javascript:setLocation("' + location + '");')
				.appendTo(cityBullet);
				cityBullet.appendTo(cityList);
			});
			cityList.appendTo(cities);
			cities.appendTo('.box.gmaps > .wrap1 > .wrap2');
			cities.slideDown();
		}
      }
	  else {
        $('.box.gmaps .textbox').before('<ul class="error"><li>Der blev desværre ikke fundet nogen koordinater for din udfyldning. Udfyld eventuelt både vej, vejnummer, postnummer og by</li></ul>');
      }
    });
}