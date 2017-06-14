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

// facebook SDK
// window.fbAsyncInit = function() {
// 	FB.init({
// 		appId      : '1966131870300579',
// 		cookie     : true,
// 		xfbml      : true,
// 		version    : 'v2.8'
// 	});
// 	FB.AppEvents.logPageView();
// };
//
// (function(d, s, id){
// 	 var js, fjs = d.getElementsByTagName(s)[0];
// 	 if (d.getElementById(id)) {return;}
// 	 js = d.createElement(s); js.id = id;
// 	 js.src = "//connect.facebook.net/en_US/sdk.js";
// 	 fjs.parentNode.insertBefore(js, fjs);
//  }(document, 'script', 'facebook-jssdk'));
//
//  FB.getLoginStatus(function(response) {
//      statusChangeCallback(response);
//  });
//
//
// function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });
// }
