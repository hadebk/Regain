$(document).ready(function () { 
    var key;
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

        var v_adsName = true;
        var v_adsCategory = true;
        var v_adsPrice = true;
        var v_adsDesc = true;
        var v_adsPhoto = true;
        var v_adsCity = true;
        var v_adsPersonName = true;
        var v_adsPhone = true;
        var v_adsEmail = true;

        var storef, file, task;
        //////////////////////////////
        // add image to storage
        var btn = document.getElementById("imgInp");
        btn.addEventListener("change", function (e) {
            file = e.target.files[0];
            storef = firebase.storage().ref("imagesAds/" + file.name);
        });
        //////////////////////////////

        //////////////////////////////
        // handle when user log in or not
        var auth = firebase.auth();
        var em;
        auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                // User is signed in.
                em = firebaseUser.displayName;
                // user signed in
                $("#btn-singUp a").html('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>' + em);
                $("#btn-singUp a").attr("href", "user-profile.html");
            } else {
                // User is signed out.
                console.log("not log in");
            }
        });
        //////////////////////////////

        // Get ELements
        const adsName = document.getElementById("ads-name");
        const adsCategory = document.getElementById("ads_category");
        const adsPrice = document.getElementById("ads-price");
        const adsDescribtion = document.getElementById("ads-describtion");
        const adsCity = document.getElementById("ads-city");
        const adsPersonName = document.getElementById("ads-personName");
        const adsPhoneNumber = document.getElementById("ads-phoneNumber");
        const adsEmail = document.getElementById("ads-email");
        const btnPost = document.getElementById("btn-post");
        const btnUpdate = document.getElementById("btn-update");
        const btnDelet = document.getElementById("btn-delet");
        const btnUploadeImage = document.getElementById("imgInp");


        // input validation //

        // ads name input
        $("#ads-name").blur(function () {
            if ($(this).val().length == 0) {
                v_adsName = true;
                $(this).css("border", "1px solid #f00");
                $(this).parent().find(".custom-alert").fadeIn(200);
            } else {
                v_adsName = false;
                $(this).css("border", "1px solid #080");
                $(this).parent().find(".custom-alert").fadeOut(200);
            }
        });
        // ads price input
        $("#ads-price").blur(function () {
            if ($(this).val().length == 0) {
                v_adsPrice = true;
                $(this).css("border", "1px solid #f00");
                $(this).parent().find(".custom-alert").fadeIn(200);
            } else {
                v_adsPrice = false;
                $(this).css("border", "1px solid #080");
                $(this).parent().find(".custom-alert").fadeOut(200);
            }
        });

        // ads description input
        $("#ads-describtion").blur(function () {
            if ($(this).val().length == 0) {
                v_adsDesc = true;
                $(this).css("border", "1px solid #f00");
                $(this).parent().find(".custom-alert").fadeIn(200);
            } else {
                v_adsDesc = false;
                $(this).css("border", "1px solid #080");
                $(this).parent().find(".custom-alert").fadeOut(200);
            }
        });
        // ads photo input
        $("#imgInp").blur(function () {
            if ($("#imgInp").val() == "") {
                v_adsPhoto = true;
                $(this).parent().css("border", "1px solid #f00");
                $(this).parents(':eq(3)').find(".custom-alert").fadeIn(200);
                console.log("img err")
            } else {
                v_adsPhoto = false;
                $(this).parent().css("border", "1px solid #080");
                $(this).parents(':eq(3)').find(".custom-alert").fadeOut(200);
                console.log("img don")
            }
        });
        // ads person name input
        $("#ads-personName").blur(function () {
            if ($(this).val().length == 0) {
                v_adsPersonName = true;
                $(this).css("border", "1px solid #f00");
                $(this).parent().find(".custom-alert").fadeIn(200);
            } else {
                v_adsPersonName = false;
                $(this).css("border", "1px solid #080");
                $(this).parent().find(".custom-alert").fadeOut(200);
            }
        });
        // ads person phone input
        $("#ads-phoneNumber").blur(function () {
            if ($(this).val().length !== 11) {
                v_adsPhone = true;
                $(this).css("border", "1px solid #f00");
                $(this).parent().find(".custom-alert").fadeIn(200);
            } else {
                v_adsPhone = false;
                $(this).css("border", "1px solid #080");
                $(this).parent().find(".custom-alert").fadeOut(200);
            }
        });
        // email input
        $("#ads-email").blur(function () {
            var res = /.+@[a-z A-Z]*\.com/.test($(this).val());
            if (!res) {
                v_adsEmail = true;
                $(this).css("border", "1px solid #f00");
                $(this).parent().find(".custom-alert").fadeIn(200);
            } else {
                v_adsEmail = false;
                $(this).css("border", "1px solid #080");
                $(this).parent().find(".custom-alert").fadeOut(200);
            }
        });

        // add post-btn event
        btnPost.addEventListener('click', e => {
            // Get data
            const name = adsName.value;
            const category = adsCategory.value;
            const price = adsPrice.value;
            const description = adsDescribtion.value;
            const city = adsCity.value;
            const personName = adsPersonName.value;
            const phoneNumber = adsPhoneNumber.value;
            const email = adsEmail.value;
            var today = new Date();
            var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
            var min = today.getMinutes();
            var hour = today.getHours();
            if (min < 10) {
                min = "0" + today.getMinutes()
            } else {
                min = today.getMinutes()
            }
            if (hour < 10) {
                hour = "0" + today.getHours();
            } else {
                hour = today.getHours()
            }
            var time = hour + ":" + min;
            var postDate = time + ' ' + date;

            function writeUserData(name, category, price, description, city, personName, phoneNumber, email, userId, postDate, url) {
                key = firebase.database().ref().child("ads").push({
                    adsName: name,
                    category: category,
                    price: price,
                    description: description,
                    city: city,
                    personName: personName,
                    phone: phoneNumber,
                    email: email,
                    userId: userId,
                    postDate: postDate,
                    photoUrl: url
                }).key;

                console.log(postDate)
            }
            var user = firebase.auth().currentUser;
            if (user) {
                // User is signed in.

                // check if input empty or filled

                if (!v_adsName && !v_adsPrice && !v_adsDesc && !v_adsPhoto && !v_adsPersonName && !v_adsPhone && !v_adsEmail) {
                    var userId = user.uid;
                    task = storef.put(file);
                    task.then(snapshot => snapshot.ref.getDownloadURL())
                        .then((url) => {
                            writeUserData(name, category, price, description, city, personName, phoneNumber, email, userId, postDate, url);
                        }).catch(console.error).catch(window.open("user-profile.html"));
                    console.log("validation done and post ads")
                } else {
                    console.log("error");
                    if (v_adsName) {
                        $("#ads-name").css("border", "1px solid #f00");
                        $("#ads-name").parent().find(".custom-alert").fadeIn(200);
                    }
                    if (v_adsPrice) {
                        $("#ads-price").css("border", "1px solid #f00");
                        $("#ads-price").parent().find(".custom-alert").fadeIn(200);
                    }
                    if (v_adsDesc) {
                        $("#ads-describtion").css("border", "1px solid #f00");
                        $("#ads-describtion").parent().find(".custom-alert").fadeIn(200);
                    }
                    if (v_adsPhoto) {
                        $("#imgInp").parent().css("border", "1px solid #f00");
                        $("#imgInp").parents(':eq(3)').find(".custom-alert").fadeIn(200);
                    }
                    if (v_adsPersonName) {
                        $("#ads-personName").css("border", "1px solid #f00");
                        $("#ads-personName").parent().find(".custom-alert").fadeIn(200);
                    }
                    if (v_adsPhone) {
                        $("#ads-phoneNumber").css("border", "1px solid #f00");
                        $("#ads-phoneNumber").parent().find(".custom-alert").fadeIn(200);
                    }
                    if (v_adsEmail) {
                        $("#ads-email").css("border", "1px solid #f00");
                        $("#ads-email").parent().find(".custom-alert").fadeIn(200);
                    }
                }
            } else {
                // Not signed in.
                alert("log in first !");
                window.open("log-in.html");
            }
        });
    }());

    //////////////////////////////////
    // read imaeg file that was added
    $(document).on('change', '.btn-file :file', function () {
        input = $(this),
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
        console.log(label + "--label")
    });

    $('.btn-file :file').on('fileselect', function (event, label) {
        var input = $(this).parents('.input-group').find(':text'),
            log = label;
        console.log(input.files + "--input")
        if (input.length) {
            input.val(log);
        }
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
                file = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function () {
        readURL(this);
        var x = $(this).val().length + "--val"
        console.log(x)
    });
    ////////////////////////////////////
});
