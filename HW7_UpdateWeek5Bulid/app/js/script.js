$(document).ready(function() {
	$(".navbar-toggle").click(function() {
		var $content = $(".navbar-collapse");

		if($content.hasClass("collapse")) {
			console.log("has that");
			$content.slideDown();
			$content.removeClass("collapse");
		}
		else {
			$content.slideUp(function() {
				$content.removeAttr("style");
				$content.addClass("collapse");
			});
		}

	});
});
