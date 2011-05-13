var tablet1 = -1;
var tablet2 = -1;

$(document).ready(function() {
	
	//Extra padding needed for IE7
	if ($.browser.msie && parseInt($.browser.version) == 7)
		$(".compareDivInner").css("padding-bottom", "17px");
						   
						   
						   
	//Populate table on page load
	populateTable(data);	
	
	populateDropdowns();
	
	
	//Dropdown lists functionality	
	$("div.dropdownList span").mouseenter(function() {
		$(this).css("background", "#ccc");
	});
	$("div.dropdownList span").mouseleave(function() {
		$(this).css("background", "#fff");
	});
	$("div.dropdownList").mouseleave(function() {
		$(this).css("display", "none");
	});
	$("img.dropdown-arrow").click(function() {
		if ($(this).next().css("display") == "none")
			$(this).next().css("display", "block");
		else
			$(this).next().css("display", "none");
	});
	
	$("div.dropdownList span").click(function() {
		$(this).parent().css("display", "none");
		var value = $("input", $(this)).val();
		$(this).parent().parent().find(".dropdownValue").val(value);
		$(this).parent().parent().find(".dropdownText").val($(this).text());
		if ($(this).parent().parent().find(".dropdownValue").attr("id") == "dropdown1Value")
			tablet1 = value;
		else
			tablet2 = value;
		
		if (tablet1 != -1 && tablet2 != -1) {
			var filteredData = new Array();
			filteredData[0] = data[tablet1];
			filteredData[1] = data[tablet2];
			
			populateTable(filteredData);		
		}
	});
	
	
	
	//"Vis alle" link
	$("#visAlleLink").click(function() {
		$("#dropdown1Value").val(-1);
		$("#dropdown1Text").val("V\u00e6lg");
		$("#dropdown2Value").val(-1);
		$("#dropdown2Text").val("V\u00e6lg");
		tablet1 = -1;
		tablet2 = -1;
		
		populateTable(data);
	});
});








function setHeight(rowHeight, divHeight, row, rowNumber) {
	if (divHeight > rowHeight) {
		if (!$.browser.msie && !$.browser.safari)
			divHeight += 9;
		$("td", row).css("height", divHeight);
	}
	else {
		$(".headerColumn div:eq(" + rowNumber + ")").css("height", rowHeight);
	}
}

function populateTable(data) {
	$(".compareDivInner table").empty();
	
	var html = '<tr>';
	
	//Image + Name
	for (var i = 0; i < data.length; i++)
	{
		html += '<td class="toprow"><a href="' + data[i].Link + '"><img alt="' + data[i].Name + '" src="' + data[i].Image + '" border="0" /></a><h3>' + data[i].Name + '</h3></td>';
	}
	//html += '<td class="toprow lastColumn">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Scores
	for (var i = 0; i < data.length; i++)
	{
		html += '<td class="toprow">';
		//general
		for (var j = 0; j < data[i].Scores.General; j++) {
			html += '<img src="' + basePath + '11_facelift/images/tablets/score.png" />';
		}
		for ( ; j < 5 ; j++) {
			html += '<img src="' + basePath + '11_facelift/images/tablets/score-empty.png" />';
		}
		html += '&nbsp<br />';
		//God pris
		for (var j = 0; j < data[i].Scores.Price; j++) {
			html += '<img src="' + basePath + '11_facelift/images/tablets/score.png" />';
		}
		for ( ; j < 5 ; j++) {
			html += '<img src="' + basePath + '11_facelift/images/tablets/score-empty.png" />';
		}
		html += '&nbsp<br />';
		//På farten
		for (var j = 0; j < data[i].Scores.Travel; j++) {
			html += '<img src="' + basePath + '11_facelift/images/tablets/score.png" />';
		}
		for ( ; j < 5 ; j++) {
			html += '<img src="' + basePath + '11_facelift/images/tablets/score-empty.png" />';
		}
		html += '&nbsp<br />';
		//Touch
		for (var j = 0; j < data[i].Scores.Touch; j++) {
			html += '<img src="' + basePath + '11_facelift/images/tablets/score.png" />';
		}
		for ( ; j < 5 ; j++) {
			html += '<img src="' + basePath + '11_facelift/images/tablets/score-empty.png" />';
		}
		html += '&nbsp<br />';
		//Underholdning
		for (var j = 0; j < data[i].Scores.Entertainment; j++) {
			html += '<img src="' + basePath + '11_facelift/images/tablets/score.png" />';
		}
		for ( ; j < 5 ; j++) {
			html += '<img src="' + basePath + '11_facelift/images/tablets/score-empty.png" />';
		}
		html += '&nbsp<br />';
		//Business
		for (var j = 0; j < data[i].Scores.Business; j++) {
			html += '<img src="' + basePath + '11_facelift/images/tablets/score.png" />';
		}
		for ( ; j < 5 ; j++) {
			html += '<img src="' + basePath + '11_facelift/images/tablets/score-empty.png" />';
		}
		html += '&nbsp;</td>';
	}
	//html += '<td class="toprow lastColumn">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//OS
	for (var i = 0; i < data.length; i++) {
		html += '<td class="odd">' + data[i].OS + '</td>';
	}
	//html += '<td class="odd">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Android Market
	for (var i = 0; i < data.length; i++) {
		html += '<td class="even">' + data[i].AndroidMarket + '</td>';
	}
	//html += '<td class="even">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Skærm
	for (var i = 0; i < data.length; i++) {
		html += '<td class="odd">' + data[i].Screen + '</td>';
	}
	//html += '<td class="odd">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Telefon
	for (var i = 0; i < data.length; i++) {
		html += '<td class="even">' + data[i].Phone + '</td>';
	}
	//html += '<td class="even">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Processor
	for (var i = 0; i < data.length; i++) {
		html += '<td class="odd">' + data[i].Processor + '</td>';
	}
	//html += '<td class="odd">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//3G
	for (var i = 0; i < data.length; i++) {
		html += '<td class="even">' + data[i].Has3G + '</td>';
	}
	//html += '<td class="even">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//hukommelse
	for (var i = 0; i < data.length; i++) {
		html += '<td class="odd">' + data[i].InternalRam + '</td>';
	}
	//html += '<td class="odd">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Hukommelseskort
	for (var i = 0; i < data.length; i++) {
		html += '<td class="even">' + data[i].MaxExtRam + '</td>';
	}
	//html += '<td class="even">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Kamera
	for (var i = 0; i < data.length; i++) {
		html += '<td class="odd">' + data[i].Camera + '</td>';
	}
	//html += '<td class="odd">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Batteri
	for (var i = 0; i < data.length; i++) {
		html += '<td class="even">' + data[i].Battery + '</td>';
	}
	//html += '<td class="even">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//RAM
	for (var i = 0; i < data.length; i++) {
		html += '<td class="odd">' + data[i].Ram + '</td>';
	}
	//html += '<td class="odd">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Størrelse
	for (var i = 0; i < data.length; i++) {
		html += '<td class="even">' + data[i].Dimensions + '</td>';
	}
	//html += '<td class="even">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//GPS
	for (var i = 0; i < data.length; i++) {
		html += '<td class="odd">' + data[i].Gps + '</td>';
	}
	//html += '<td class="odd">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Audio
	for (var i = 0; i < data.length; i++) {
		html += '<td class="even">' + data[i].Audio + '</td>';
	}
	//html += '<td class="even">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Exchange
	for (var i = 0; i < data.length; i++) {
		html += '<td class="odd">' + data[i].Exchange + '</td>';
	}
	//html += '<td class="odd">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Telefon
	for (var i = 0; i < data.length; i++) {
		html += '<td class="even">' + data[i].SocialMedia + '</td>';
	}
	//html += '<td class="even">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Vægt
	for (var i = 0; i < data.length; i++) {
		html += '<td class="odd">' + data[i].Weight + '</td>';
	}
	//html += '<td class="odd">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	//Link
	for (var i = 0; i < data.length; i++) {
		html += '<td class="toprow" style="text-align:center;"><br /><a href="' + data[i].Link + '" class="btn px13 purple"><span>L&aelig;s mere</span></a></td>';
	}
	//html += '<td class="toprow">&nbsp;</td></tr><tr>';
	html += '</tr><tr>';
	
	$(".compareDivInner table").append(html);
	
	
	
	
	var excessWidth = 0;
	
	if (data.length > 4) {
		$(".compareDivInner table").css("width", data.length * 160);
	}
	else {
		$(".compareDivInner table").css("width", 500);
		excessWidth = 500 - (data.length * 160);
	}
	if (excessWidth == 500)
		$(".compareDivInner table .lastColumn").hide();
	else
		$(".compareDivInner table .lastColumn").css("width", excessWidth);
		
	
	setHeights();
}

function setHeights() {
	var rowNumber = 0;
	$(".compareDiv table tr").each(function() {
		var rowHeight = $("td:eq(1)", $(this)).height();
		var divHeight = $(".headerColumn div:eq(" + rowNumber + ")").height();
				
		var row = $(this);
		if (rowNumber == 0) {
			$("tr:eq(0) td:eq(0) img").load(function() {
				var rh = $("tr:eq(0) td:eq(0)").height();
				if (navigator.appVersion.indexOf("Mac")!=-1)
					rh += 0;
				else
					rh += 0;
				$(".headerColumn div:eq(0)").css("height", rh);
			});
			var src = $("td:eq(0) img", row).attr("src");
			$("td:eq(0) img", row).attr("src", "");
			$("td:eq(0) img", row).attr("src", src);
		}
		else if (rowNumber == 19) {
			$("tr:eq(19) td:eq(0) img").load(function() {
				var rh = $("tr:eq(19) td:eq(0)").height();
				if (navigator.appVersion.indexOf("Mac")!=-1)
					rh += 0;
				else
					rh += 0;
				$(".headerColumn div:eq(19)").css("height", rh);
			});
			var src = $("td:eq(0) img", row).attr("src");
			$("td:eq(0) img", row).attr("src", "");
			$("td:eq(0) img", row).attr("src", src);
		}
		else if (rowNumber == 1) {
			if (navigator.appName == "Opera")
				setTimeout(function() {setRow1(row)}, 500);
			else
				setRow1(row);
		}
		else {
			setHeight(rowHeight, divHeight, row, rowNumber);
		}
		rowNumber++;
	});
}

function setRow1(row) {
	$("tr:eq(1) td:eq(0) img").load(function() {
		var rh = $("tr:eq(1) td:eq(0)").height();
		if (navigator.appVersion.indexOf("Mac")!=-1)
			rh += 0;
		else
			rh += 0;
		$(".headerColumn div:eq(1)").css("height", rh);
	});
	var src = $("td:eq(0) img", row).attr("src");
	$("td:eq(0) img", row).attr("src", "");
	$("td:eq(0) img", row).attr("src", src);
}

function populateDropdowns() {
	$(".dropdownList").empty();
	var html = "";
	for (var i = 0; i < data.length; i++) {
		html += '<span><input type="hidden" value="' + i + '" />' + data[i].Name + '</span>';
	}
	
	$(".dropdownList").append(html);
}