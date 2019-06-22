(function () {

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
    const auth = firebase.auth();
    // Get ELements
    const textEmail = document.getElementById("exampleInputEmail1");
    const textpass = document.getElementById("exampleInputPassword1");
    const username = document.getElementById("userName");
    const btnsignup = document.getElementById("btn-signup");

    // inputs validation
    var nameError = true;
    var emailError = true;
    var passError = true;
    var passError2 = true;
    var passMatchError = false;

    // email input
    $("#exampleInputEmail1").blur(function () {
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
    $("#exampleInputPassword1").blur(function () {
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

    // pass input
    $("#exampleInputPassword2").blur(function () {
        if ($(this).val() !== $("#exampleInputPassword1").val()) {
            passError2 = true;
            $(this).css("border", "1px solid #f00");
            $(this).parent().find(".custom-alert").fadeIn(200);
        } else {
            passError2 = false;
            $(this).css("border", "1px solid #080");
            $(this).parent().find(".custom-alert").fadeOut(200);
        }
    })

    // name input
    $("#userName").blur(function () {
        if ($(this).val().length == 0) {
            nameError = true;
            $(this).css("border", "1px solid #f00");
            $(this).parent().find(".custom-alert").fadeIn(200);
        } else {
            nameError = false;
            $(this).css("border", "1px solid #080");
            $(this).parent().find(".custom-alert").fadeOut(200);
        }
    })


    // add log in event
    btnsignup.addEventListener('click', e => {
        // Get email and pass
        const email = textEmail.value;
        const pass = textpass.value;

        if (!nameError && !emailError && !passError && !passError2) {
            // sign up
            const cons = auth.createUserWithEmailAndPassword(email, pass);
            cons.catch(e => console.log(e.message));
            cons.catch(e => console.log(e.code));
            cons.catch(e => $.notify(":) تم إنشاء الحساب بنجاح", "success"));

            //real tmie auth
            auth.onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    // User is signed in.
                    firebaseUser.updateProfile({ // <-- Update Method here
                        displayName: username.value
                    }).then(function () {
                        var displayName = firebaseUser.displayName;
                        console.log("name " + displayName);
                    }, function (error) {
                        console.log(error.message);
                        console.log(error.code);
                    });
                    window.open('home-page.html');
                } else {
                    // User is signed out.
                    console.log("not log in");
                }
            });
        } else {
            console.log("ops");

            if (nameError) {
                $("#userName").css("border", "1px solid #f00");
                $("#userName").parent().find(".custom-alert").fadeIn(200);
            }
            if (emailError) {
                $("#exampleInputEmail1").css("border", "1px solid #f00");
                $("#exampleInputEmail1").parent().find(".custom-alert").fadeIn(200);
            }
            if (passError) {
                $("#exampleInputPassword1").css("border", "1px solid #f00");
                $("#exampleInputPassword1").parent().find(".custom-alert").fadeIn(200);
            }
            if (passError2) {
                $("#exampleInputPassword2").css("border", "1px solid #f00");
                $("#exampleInputPassword2").parent().find(".custom-alert").fadeIn(200);
            }

        }



    });


}());
