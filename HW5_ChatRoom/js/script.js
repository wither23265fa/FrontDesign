$(document).ready(function(){

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
  const $email = $('#email');
  const $password = $('#password');
  const $btnSignIn = $('#btnSignIn');
  const $btnSignUp = $('#btnSignUp');
  // const $btnSignOut = $('#btnSignOut');
  const $signInfo = $('#sign-info');
  const $menuLogOut = $('#menu-logout');

  // SignIn
  $btnSignIn.click(function(e){
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signIn
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function(e){
      console.log(e.message);
      $signInfo.html(e.message);
    });
    promise.then(function(e){
      console.log("sign in suceesfully");
      // $signInfo.html("sign in suceesfully");
      window.location.href = "./updateInfo.html";
    });
  });

  // SignUp
  $btnSignUp.click(function(e){
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signUp
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(function(e){
      console.log(e.message);
      $signInfo.html(e.message);
    });
    promise.then(function(e){
      window.location.href = "./updateInfo.html";
    });
  });

  // Listening Login User
  firebase.auth().onAuthStateChanged(function(user){
    if(user) {
      console.log(user);
      $signInfo.html(user.email+" is login...");
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: "+profile.providerId);
        console.log("  Provider-specific UID: "+profile.uid);
        console.log("  Name: "+profile.displayName);
        console.log("  Email: "+profile.email);
        console.log("  Photo URL: "+profile.photoURL);
      });
    } else {
      console.log("not logged in");
    }
  });


  // const $menuLogOut = $('#menu-logout');

  // Signout
  $menuLogOut.click(function(){
    console.log("not logged in");
    // window.location.href = "./index.html";
    firebase.auth().signOut();
    console.log("logged out");
    $signInfo.html('You are already logged out...');
  });
});
