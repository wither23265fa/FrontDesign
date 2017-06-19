// FB tester
const $userInfo = $('#UserInfo');
var loginBtn = document.getElementById('LoginBtn');


$(document).ready(function() {

	window.fbAsyncInit = function() {
		FB.init({
      appId      : '1966131870300579',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
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

	var UserInfo = document.getElementById('UserInfo');

	function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      printInfo(response);
			// document.getElementsByClassName('cancelbtn').style.display = "none";
			// loginBtn.style.display = "none";
			document.getElementById('LoginBtn').style.display = "none";

    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('UserInfo').innerHTML = 'Please log ' +
        'into this app.';
    }
  };

	function printInfo(response){
		console.log(response.status);
		console.log("userIDByFacebook = " + response.authResponse.userID);
		// UserInfo.innerHTML = response.status;
		var txt1 = $("<p></p>").text(response.authResponse.userID);
		var txt2 = $("<p></p>").text(response.authResponse);
		var txt3 = $("<p></p>").text(response.status);
		$userInfo.append(txt1, txt2, txt3);
	};

	// Get the modal
	var modal = document.getElementById('id01');
	var logOutBtn = document.getElementById('LogoutBtn');
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {

		if (event.target == logOutBtn) {
			console.log("ready to logout");
			FB.logout();
			console.log("already to logout");
			// console.log(response.status);
			logOutBtn.style.display = "none";
		}else if (event.target == modal) {
			modal.style.display = "none";
		}
	};


});
