var currentImage = 0;
var animating = false;

$(document).ready(function() {
	$(".imageSelector").click(function() {
		if (!animating) {
			var imageNumber = $(".imageSelector").index($(this));
			if (imageNumber == currentImage)
				return;
				
			animating = true;
			$(".imageSelector").removeClass("selected");
			$(this).addClass("selected");
			
			if ($.browser.msie)
				$("#mainLaptopImage img").css("backgroundColor", "#fff");
			$("#mainLaptopImage img:eq(" + currentImage + ")").fadeOut(500, function() {
				$("#mainLaptopImage img:eq(" + imageNumber + ")").fadeIn(500, function() {
					$("#mainLaptopImage img").css("backgroundColor", "transparent");					
					animating = false;
					currentImage = imageNumber;
				});
				
			});
		}		
	});
	
	});
