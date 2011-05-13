var currentActiveText = 0;
var sourcePrefix = "selector";
var sourceActivePostfix = "-active";
var sourceHoverPostfix = "-hover";
var extension = ".png";
var animating = false;

$(document).ready(function() {
	
	var maxHeight = 0;
	$("#textContentWrapper .textContent").each(function() {
		if ($(this).height() > maxHeight)
			maxHeight = $(this).height();
		$(this).css("height", $(this).height() + "px");
	});
	$("#textContentWrapper").css("height", maxHeight);
	
	// add hit areas
	/*$(".selectorDiv > img").each(function(i, el){
		var styles;
		if(window.getComputedStyle){
			styles = window.getComputedStyle(el).cssText;
		} else { // ie
			styles = el.currentStyle;
		}
		var $div = $(el).append('<div/>');
		for(var i = 0; i < styles.length; i++){
			$div.css();
		}
	});*/
		
		
	$(".selectorDiv > div:not(#x-screamer, .cl)").mouseenter(function() {
		var $this = $(this).next('img'), index = $(".selectorDiv > img").index($this) + 1;
		if (index != currentActiveText) {
			$('#x-screamer').addClass('s' + index);
			$this.attr("src", basePath + "11_facelift/images/mobilaftale/" + sourcePrefix + index + sourceHoverPostfix + extension);
		}
	});
	
	$(".selectorDiv > div:not(#x-screamer, .cl)").mouseleave(function() {
		var $this = $(this).next('img'), index = $(".selectorDiv > img").index($this) + 1;
		if (index != currentActiveText) {
			$('#x-screamer').removeClass('s' + index);
			$this.attr("src", basePath + "11_facelift/images/mobilaftale/" + sourcePrefix + index + extension);
		}
	});
		
						   
	$(".selectorDiv div:not(#x-screamer, .cl)").click(function() {
		var $this = $(this).next('img'), index = $(".selectorDiv img").index($this) + 1;
		$('#x-screamer').removeClass('s' + index);
		if (index == currentActiveText)
			return;
		else {
			if (animating == false) {
				animating = true;
				if (currentActiveText != 0){
					$(".selectorDiv img:eq(" + (currentActiveText - 1) + ")").attr("src", basePath + "11_facelift/images/mobilaftale/" + sourcePrefix + currentActiveText + extension);
				}
				$this.attr("src", basePath + "11_facelift/images/mobilaftale/" + sourcePrefix + index + sourceActivePostfix + extension);

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