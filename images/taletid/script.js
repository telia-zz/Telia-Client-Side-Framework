var currentActiveText = 0;
var sourcePrefix = "selector";
var sourceActivePostfix = "-active";
var sourceHoverPostfix = "-hover";
var extension = ".jpg";
var animating = false;

$(document).ready(function() {
	var maxHeight = 0;
	$("#textContentWrapper .textContent").each(function() {
		if ($(this).height() > maxHeight)
			maxHeight = $(this).height();
		$(this).css("height", $(this).height() + "px");
	});
	$("#textContentWrapper").css("height", maxHeight);
		
		
	$("#talk-forsikring .selectorDiv img").mouseenter(function() {
		var index = $("#talk-forsikring .selectorDiv img").index($(this)) + 1;
		if (index != currentActiveText) {
			$(this).attr("src", basePath + "11_facelift/images/taletid/" + sourcePrefix + index + sourceHoverPostfix + extension);
		}
	});
	
	$("#talk-forsikring .selectorDiv img").mouseleave(function() {
		var index = $("#talk-forsikring .selectorDiv img").index($(this)) + 1;
		if (index != currentActiveText) {
			$(this).attr("src", basePath + "11_facelift/images/taletid/" + sourcePrefix + index + extension);
		}
	});		
		
		
						   
	$("#talk-forsikring .selectorDiv img").click(function() {
		var index = $("#talk-forsikring .selectorDiv img").index($(this)) + 1;
		if (index == currentActiveText)
			return;
		else {
			if (animating == false) {
				animating = true;
				if (currentActiveText != 0)
					$("#talk-forsikring .selectorDiv img:eq(" + (currentActiveText - 1) + ")").attr("src", basePath + "11_facelift/images/taletid/" + sourcePrefix + currentActiveText + extension);
				$(this).attr("src", basePath + "11_facelift/images/taletid/" + sourcePrefix + index + sourceActivePostfix + extension);
			
				$("#textContent" + currentActiveText).slideUp(500, function() {
																				$("#textContent" + index).slideDown(500, function() { 
																																  		animating=false; 
																																	});
																			});
				currentActiveText = index;
			}
		}
	});
});