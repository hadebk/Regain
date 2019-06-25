(function() {

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCLMcCiJyeMpDqkbADFd3-yHMIwPU_eXAU",
    authDomain: "regain-311b2.firebaseapp.com",
    databaseURL: "https://regain-311b2.firebaseio.com",
    projectId: "regain-311b2",
    storageBucket: "regain-311b2.appspot.com",
    messagingSenderId: "1022990933574",
    appId: "1:1022990933574:web:90769bcc22af7235"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Get ELements
  const textEmail = document.getElementById("exampleInputEmail1");
  const textpass = document.getElementById("exampleInputPassword1");
  const btnlogin = document.getElementById("btn-login");
  const auth = firebase.auth();

  // reset password
  $("#reset-pass").click(function() {
    let textEmail1 = document.getElementById("exampleInputEmail1").value;
    console.log(textEmail1);
    if (textEmail1 != "") { // user write email in email input
      firebase.auth().sendPasswordResetEmail(textEmail1).then(function() {
        // Email sent.
        $.notify("تم إرسال إيميل لإعادة تعيين كلمة السر", "success")
      }).catch(function(error) {
        // An error happened.
        console.log(error.code);
        console.log(error.message);
      });
    } else { // user not write email in email input
      $.notify("برجاء إدخال الإيميل أولا", "error")
    }
  }) // end reset_pass()

  // inputs validation
  var emailError = true;
  var passError = true;

  // email input
  $("#exampleInputEmail1").blur(function() {
    var res = /.+@[a-z A-Z]*\.com/.test($(this).val());
    if (!res) {
      emailError = true;
      $(this).css("border", "1px solid #f00");
      $(this).parent().find(".custom-alert").fadeIn(200);
    } else {
      emailError = false;
      $(this).css("border", "1px solid #080");
      $(this).parent().find(".custom-alert").fadeOut(200);
    }
  });

  // pass input
  $("#exampleInputPassword1").blur(function() {
    if ($(this).val().length < 6) {
      passError = true;
      $(this).css("border", "1px solid #f00");
      $(this).parent().find(".custom-alert").fadeIn(200);
    } else {
      passError = false;
      $(this).css("border", "1px solid #080");
      $(this).parent().find(".custom-alert").fadeOut(200);
    }
  })

  // add log in event
  btnlogin.addEventListener('click', e => {

    // Get email and pass
    const email = textEmail.value;
    const pass = textpass.value;

    if (!emailError && !passError) {
      const cons = auth.signInWithEmailAndPassword(email, pass);
      cons.catch(e => console.log(e.message));
      cons.catch(e => console.log(e.code));
      cons.catch(e => $.notify("خطأ في الإيميل أو كلمة السر", "error"));

      //real tmie auth
      auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          // User is signed in.
          window.open('user-profile.html', '_self', false);
        } else {
          // User is signed out.
        }
      });
    } else {
      console.log("error");
      if (passError) {
        $("#exampleInputPassword1").css("border", "1px solid #f00");
        $("#exampleInputPassword1").parent().find(".custom-alert").fadeIn(200);
        console.log('pass error')
      }
      if (emailError) {
        $("#exampleInputEmail1").css("border", "1px solid #f00");
        $("#exampleInputEmail1").parent().find(".custom-alert").fadeIn(200);
        console.log('email error')
      }
    }
  });

  // log in with google account
  const btngoogle = document.getElementById("btn-google");
  var provider = new firebase.auth.GoogleAuthProvider();
  btngoogle.addEventListener('click', e => {
    console.log(provider);
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      console.log("success..");
      //real tmie auth
      auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          // User is signed in.
          window.open('user-profile.html', '_self', false);
        } else {
          // User is signed out.
          console.log("there is no user!")
        }
      });
    }).catch(function(error) {
      console.log(error);
      console.log("fail!");
    });

  });


  // log in with facfebook account
  /*const btnfacebook = document.getElementById("btn-facebook");
  var provider = new firebase.auth.FacebookAuthProvider();
  btnfacebook.addEventListener('click', e => {
      console.log("cc");
      firebase.auth().signInWithPopup(provider).then(function (result) {
          // This gives you a facebook Access Token. You can use it to access the fcaebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user);
          console.log("success..");
      }).catch(function (error) {
          console.log(error);
          console.log("fail!");
      });
  });*/

}());
