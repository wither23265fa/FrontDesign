$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC7VSggfKkh6z8v_C8RdvEVTKDrqrN9FbU",
    authDomain: "chatroom-fe608.firebaseapp.com",
    databaseURL: "https://chatroom-fe608.firebaseio.com",
    projectId: "chatroom-fe608",
    storageBucket: "chatroom-fe608.appspot.com",
    messagingSenderId: "1011793719398"
  };
  firebase.initializeApp(config);
  // $ 取得該元素
  const $userName = $('#userName');
  const $email = $('#email');
  const $password = $('#password');
  const $btnSignIn = $('#btnSignIn');
  const $btnSignUp = $('#btnSignUp');
  const $signInfo = $('#sign-info');
  const $btnLogOut = $('#menu-logout');
  const $btnSubmit = $('#btnSubmit');
  //message
  const $messageField = $('#messageInput');
  const $messageList = $('#example-messages');

  // Firebase database reference
  var dbRef = firebase.database().ref();
  var dbChatRoom = firebase.database().ref().child('chatroom');
  var dbUser = firebase.database().ref().child('User');
  var user = firebase.auth().currentUser;
  var photoURL = "./image/default.jpg";
  var typeName;

  // Listening userName
  $btnSubmit.attr('disabled', 'disabled');
  $userName.on("change paste keyup", function() {
    if ($userName.val() == '') {
      $btnSubmit.attr('disabled', 'disabled');
      $("test").attr('visibility', 'visible');
      console.log("let submit disabled");
    } else {
      $btnSubmit.removeAttr('disabled');
      console.log("let submit abled");
    }
  });

  // SignIn
  $btnSignIn.click(function(e) {
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signIn
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function(e) {
      console.log(e.message);
      $signInfo.html(e.message);
    });
    promise.then(function(e) {
      console.log("sign in suceesfully");
      $signInfo.html("sign in suceesfully");
      window.location.href = "./chatroom.html";
    });
  });

  // SignUp
  $btnSignUp.click(function(e) {
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signUp
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(function(e) {
      console.log(e.message);
      $signInfo.html(e.message);
    });
    promise.then(function(user) {
      console.log("SignUp user is" + user.uid);
      // user.set({uid:user.uid});
      const dbUserid = dbUser.child(user.uid);
      dbUserid.set({
        email: email,
        username: "",
        occupation: "",
        age: "",
        description: "",
        photoURL: ""
      });
      window.location.href = "./updateInfo.html";
    });
  });

  // Submit
  $btnSubmit.click(function() {
    var user = firebase.auth().currentUser;
    const dbUserid = dbUser.child(user.uid);
    dbUserid.update(
      {
        username: $('#userName').val(),
        occupation: $('#occupation').val(),
        age: $('#age').val(),
        description: $('#decription').val(),
        photoURL: photoURL
    });
    typeName = $('#userName').val();
    window.location.href = "./chatroom.html";
  });

  //載入資料
  function loadData(currentUser){
    var userId = firebase.auth().currentUser.uid;
    var dbUserInfo = firebase.database().ref('/User/' + userId);
    dbUserInfo.on("value", function(snapshot){
      var username = snapshot.val().username;
      var occupation = snapshot.val().occupation;
      var age = snapshot.val().age;
      var description = snapshot.val().description;
      var imageUrl = snapshot.val().photoURL;
      typeName = username;
      // console.log(username + "  " + occupation);
      $('#profile-name').html(username);
      $('#profile-email').html(currentUser.email);
      $('#profile-occupation').html(occupation);
      $('#profile-age').html(age);
      $('#profile-decription').html(description);
      $('img').attr("src", imageUrl);
    });

    // chatroom
    dbChatRoom.limitToLast(10).on('child_added', function (snapshot) {
      //GET DATA
      var data = snapshot.val();
      var username = data.username;
      var message = data.message;
      // console.log(username + "<-");
      //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
      var $messageElement = $("<li>");
      var $image = $("<img>");
      // $image.attr("src", "/image/default.jpg");
      var $nameElement = $("<strong class='example-chat-username'></strong>");
      $nameElement.text(username + " : ");
      $messageElement.text(message).prepend($nameElement);
      $messageElement.prepend()
      //ADD MESSAGE
      $messageList.append($messageElement);

      //SCROLL TO BOTTOM OF MESSAGE LIST
      $messageList[0].scrollTop = $messageList[0].scrollHeight;
    });

  }

  // 當按下enter
  $messageField.keypress(function (e) {
    console.log("confirm click");
    if (e.keyCode == 13) {
      //FIELD VALUES
      var message = $messageField.val();
      console.log(typeName);
      console.log(message);
      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      dbChatRoom.push({username: typeName, message: message});
      $messageField.val('');
    }
  });

  // Signout
  $btnLogOut.click(function(e) {
    console.log("not logged in to server");
    firebase.auth().signOut();
    $signInfo.html("You are already logged out...");
  });

  // 存檔用
  var storageRef = firebase.storage().ref();
  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];

    var metadata = {
      'contentType': file.type
    };

    // Push to child path.
    // [START oncomplete]
    storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log(snapshot.metadata);
      photoURL = snapshot.metadata.downloadURLs[0];
      console.log('File available at', photoURL);
    }).catch(function(error) {
      // [START onfailure]
      console.error('Upload failed:', error);
      // [END onfailure]
    });
    // [END oncomplete]
  }

  window.onload = function () {
    $('#file').change(handleFileSelect);
  }

  // Listening Login User
  firebase.auth().onAuthStateChanged(function(user) {
    //需在這裏面做user 貌似是這裡會init
    if (user) {
      console.log(user);
      $signInfo.html(user.email + " is login...");

      var user = firebase.auth().currentUser;
      const dbUserid = dbUser.child(user.uid);
      loadData(user);
      // console.log(dbUser.child(user.uid) + "31231");
      // const dbUserid = dbUser.child(user.uid);
      user.providerData.forEach(function(profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
        console.log("  User.uid: " + user.uid);
      });
    } else {
      console.log("not logged in");
    }
  });
});
