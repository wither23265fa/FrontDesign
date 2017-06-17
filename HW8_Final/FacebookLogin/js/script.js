window.fbAsyncInit = function() {
	FB.init({
		appId      : '1966131870300579',
		cookie     : true,
		xfbml      : true,
		version    : 'v2.8'
	});
	FB.AppEvents.logPageView();
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(document).ready(function() {
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



// var text = $("<h2></h2>").text("123");
// var txt2 = $("<p></p>").text("Text.");


// userInfo.append(text);
FB.getLoginStatus(function(response) {
    statusChangeCallback(response);

		if (response.status == 'connected') { // 登入成功
			var txt2 = $("<p></p>").text(response.authResponse.userID);
			$userInfo.append(txt2);
		}
		else {
			var txt2 = $("<p></p>").text("none");
			$userInfo.append("none");
		}
});

});
