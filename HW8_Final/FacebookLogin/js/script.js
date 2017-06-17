$(document).ready(function() {
	window.fbAsyncInit = function() {
		FB.init({
			appId: '{1966131870300579}',
			cookie: true,
			xfbml: true,
			version: 'v2.8'
		});
		FB.AppEvents.logPageView();

		FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  	});
	};

	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	// FB.getLoginStatus(function(response) {
	// 	statusChangeCallback(response);
	// 	console.log(response.status);
	// });

	// Get the modal
	var modal = document.getElementById('id01');

	// const $userInfo = $('.UserInfo');
	// var userInfo = document.getElementsByClassName('UserInfo');
	const $userInfo = $('#UserInfo');

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
	// 
	// FB.getLoginStatus(function(response) {
	// 	statusChangeCallback(response);
	//
	// 	if (response.status == 'connected') { // 登入成功
	// 		var txt1 = $("<p></p>").text(response.authResponse.userID);
	// 		var txt2 = $("<p></p>").text(response.authResponse);
	// 		var txt3 = $("<p></p>").text(response.status);
	// 		$userInfo.append(txt1, tx2, tx3);
	// 	} else {
	// 		var txt2 = $("<p></p>").text("none");
	// 		$userInfo.append("none");
	// 	}
	// });
});
