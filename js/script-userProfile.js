$(document).ready(function () {

    // fixed thead in table
    'use strict'
    window.onload = function () {
        var tableCont = document.querySelector('.table-responsive');

        function scrollHandle(e) {
            var scrollTop = this.scrollTop;
            this.querySelector('thead').style.transform = 'translateY(' + scrollTop + 'px)';
        }
        tableCont.addEventListener('scroll', scrollHandle)
    }
    /////////////////////////////////////////////////////////////
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
        // show ads in user profile
        var auth = firebase.auth();
        var uid;
        var keys = [];

        var v_adsName = false;
        var v_adsPrice = false;
        var v_adsDesc = false;
        var v_adsPersonName = false;
        var v_adsPhone = false;
        var v_adsEmail = false;

        // Get ELements
        const adsName = document.getElementById("ads-name");
        const adsCategory = document.getElementById("ads_category");
        const adsPrice = document.getElementById("ads-price");
        const adsDescribtion = document.getElementById("ads-describtion");
        const adsCity = document.getElementById("ads-city");
        const adsPersonName = document.getElementById("ads-personName");
        const adsPhoneNumber = document.getElementById("ads-phoneNumber");
        const adsEmail = document.getElementById("ads-email");

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

        auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                // User is signed in.
                //////////////////////////////
                // handle when user log in or note
                var em;
                // User is signed in.
                em = firebaseUser.email;
                $("#btn-singUp a").html('<span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>' + "تسجيل الخروج");
                //$("#btn-singUp a").attr("href", "home-page.html");
                $("#btn-addAds a").attr("href", "add-new-ad.html");
                $("#btn-singUp").click(function () {
                    firebase.auth().signOut().then(function () {
                        // Sign-out successful.
                        console.log("log out..");
                        window.open('home-page.html', '_self', false);
                    }).catch(function (error) {
                        // An error happened.
                        console.log(error.message);
                        console.log("not log out !");
                    });
                });
                ////////////////////////////////////////////////////
                uid = auth.currentUser.uid;
                console.log(uid);
                firebase.database().ref("ads").orderByChild("userId").equalTo(uid).on('value', function (snapshot) {
                    if (snapshot.exists()) {
                        var content = '';

                        //go through each item found and print out the emails
                        snapshot.forEach(function (data) {
                            var node = document.getElementById("ads-table");
                            while (node.hasChildNodes()) {
                                node.removeChild(node.lastChild);
                            }
                            // get data
                            var dateOfAds = data.val().postDate;
                            var nameOfAds = data.val().adsName;
                            var priceOfAds = data.val().price;
                            var photoUrl = data.val().photoUrl;
                            // check if date equal to today date
                            var inputDate = new Date(dateOfAds);
                            var todaysDate = new Date();
                            var yesterday = new Date(todaysDate - 864e5);
                            var hour = "";
                            if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
                                for (var i = 0; i < 5; i++) {
                                    hour += dateOfAds.charAt(i);
                                }
                                dateOfAds = "اليوم" + " " + hour;
                            } else if (inputDate.setHours(0, 0, 0, 0) == yesterday.setHours(0, 0, 0, 0)) {
                                for (var i = 0; i < 5; i++) {
                                    hour += dateOfAds.charAt(i);
                                }
                                dateOfAds = "الأمس" + " " + hour;
                            }
                            content += '<tr class=' + data.key + '>';
                            content += '<td><img class="ads_image" src=' + photoUrl + '></td>';
                            content += '<td>' + dateOfAds + '</td>';
                            content += '<td>' + nameOfAds + '</td>';
                            content += '<td>' + priceOfAds + '&nbsp;ج.م</td>';
                            content += '<td><button class="btn-showAdsToUpdate" data-toggle="modal" data-target="#centralModalLg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>تعديل</button></td>';
                            content += '<td><button class="btn-delet"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span>حذف</button></td>';
                            content += '</tr>';
                            content += '<hr>';
                        });
                        $("#ads-table").append(content);
                        // revers the tr to show last added ads first
                        var tbody = $('#ads-table');
                        tbody.html($('tr', tbody).get().reverse());
                        console.log("data showed, done !");
                        var key_ads;
                        var nameOfAds, categoryOfAds, priceOfAds, descOfAds, cityOfAds, personNameOfAds, phoneOfAds, emailOfAds, imgOfAds, dateAds, uidAds;

                        // show modal when click update button

                        $(".btn-showAdsToUpdate").click(function () {
                            key_ads = $(this).parents(':eq(1)').attr("class");
                            console.log(key_ads);
                            // get values from db
                            auth.onAuthStateChanged(firebaseUser => {
                                if (firebaseUser) {
                                    // User is signed in.
                                    firebase.database().ref("ads").orderByKey().equalTo(key_ads).once('value', function (snapshot) {
                                        if (snapshot.exists()) {
                                            //go through each item found and print out the emails
                                            snapshot.forEach(function (data) {
                                                // get data
                                                nameOfAds = data.val().adsName;
                                                categoryOfAds = data.val().category;
                                                priceOfAds = data.val().price;
                                                descOfAds = data.val().description;
                                                cityOfAds = data.val().city;
                                                personNameOfAds = data.val().personName;
                                                phoneOfAds = data.val().phone;
                                                emailOfAds = data.val().email;
                                                imgOfAds = data.val().photoUrl;
                                                dateAds = data.val().postDate;
                                                uidAds = data.val().userId;
                                            });

                                            // set data to inputs in modal
                                            adsName.value = nameOfAds;
                                            adsCategory.value = categoryOfAds;
                                            adsPrice.value = priceOfAds;
                                            adsDescribtion.value = descOfAds;
                                            adsCity.value = cityOfAds;
                                            adsPersonName.value = personNameOfAds;
                                            adsPhoneNumber.value = phoneOfAds;
                                            adsEmail.value = emailOfAds;
                                            $('#img-upload').attr('src', imgOfAds);

                                            // btn update action (in modal)
                                            function updateAds(name, category, price, description, city, personName, phoneNumber, email, userId, postDate, url) {
                                                // ads entry.
                                                var postData = {
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
                                                };
                                                //var updates = {};
                                                // updates['/ads/'+key_ads] = postData;
                                                return firebase.database().ref("ads/").child(key_ads).update(postData);
                                            } // end of updateAds
                                            const btnUpdate = document.getElementById("btn-update");
                                            btnUpdate.addEventListener('click', e => {
                                                // Get data
                                                const name = adsName.value;
                                                const category = adsCategory.value;
                                                const price = adsPrice.value;
                                                const description = adsDescribtion.value;
                                                const city = adsCity.value;
                                                const personName = adsPersonName.value;
                                                const phoneNumber = adsPhoneNumber.value;
                                                const email = adsEmail.value;

                                                // check if input empty or filled

                                                if (!v_adsName && !v_adsPrice && !v_adsDesc && !v_adsPersonName && !v_adsPhone && !v_adsEmail) {
                                                    updateAds(name, category, price, description, city, personName, phoneNumber, email, uidAds, dateAds, imgOfAds);
                                                    console.log("تم تعديل المعلومات بنجاح :)" + key_ads);
                                                    document.location.reload(true)
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

                                            }); //end of add event

                                        } else { // snapshot not exist
                                            console.log("no data")
                                        }
                                    }); // end of on()
                                } else {
                                    // User is signed out.
                                    console.log("not log in");
                                }
                            }); // end of onAuthStateChanged()
                        }); // end of update button click event

                        // delet ads function
                        $(".btn-delet").click(function () {
                            console.log("delet")
                            var key_ads = $(this).parents(':eq(1)').attr("class");
                            var urlimg;
                            console.log("key:" + key_ads);
                            // get url
                            firebase.database().ref("ads").orderByKey().equalTo(key_ads).on('value', function (snapshot) {
                                if (snapshot.exists()) {
                                    // get data
                                    snapshot.forEach(function (data) {
                                        urlimg = data.val().photoUrl;
                                    })
                                    console.log("url-2:" + urlimg);
                                    // Create a reference to the file to delete
                                    var storage = firebase.storage();
                                    var desertRef = storage.refFromURL(urlimg);
                                    // Delete the file
                                    desertRef.delete().then(function () {
                                        // File deleted successfully
                                        console.log("delet image");
                                    }).catch(function (error) {
                                        // Uh-oh, an error occurred!
                                    });
                                    firebase.database().ref('/ads/' + key_ads).remove();
                                    console.log(" delet done");
                                } else {
                                    console.log("no data")
                                }
                            });
                        });
                        // end deletAds
                    } else {
                        var node = document.getElementById("ads-table");
                        while (node.hasChildNodes()) {
                            node.removeChild(node.lastChild);
                        }
                        $("#pills-home").css({
                            "background-image": 'url("./images/no-ads2.jpg")',
                            "background-position": "center -20px",
                            "height": "550px"

                        });
                        console.log("no data")
                    }

                });

                /////////////////////////////////////////////////////////////////////////////////////////////////////////

                // retrive all  favs ads and show it in table

                firebase.database().ref("favoritesAsd/" + uid).orderByKey().on('value', function (snapshot) {
                    if (snapshot.exists()) {
                        var content = '';
                        //get key of ads that has been faviorated
                        snapshot.forEach(function (data) {
                            keys.push(data.val().keyOfAds)
                        });
                        // loop on key and retrive data
                        /////////////////////////////////////
                        firebase.database().ref("ads").orderByKey().on('value', function (snapshot) {
                            if (snapshot.exists()) {
                                var content = '';
                                //go through each item found and print out the emails
                                snapshot.forEach(function (data) {
                                    if (keys.includes(data.key)) {
                                        var chil = document.getElementById("fav-table");
                                        while (chil.hasChildNodes()) {
                                            chil.removeChild(chil.lastChild);
                                            console.log("clean");
                                        }
                                        // get data
                                        var dateOfAds = data.val().postDate;
                                        var nameOfAds = data.val().adsName;
                                        var nameOfAuther = data.val().personName;
                                        var priceOfAds = data.val().price;
                                        var cityOfAds = data.val().city;
                                        var imgUrlOfAds = data.val().photoUrl;
                                        // check if date equal to today date
                                        var inputDate = new Date(dateOfAds);
                                        var todaysDate = new Date();
                                        var yesterday = new Date(todaysDate - 864e5);
                                        var hour = "";
                                        if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
                                            for (var i = 0; i < 5; i++) {
                                                hour += dateOfAds.charAt(i);
                                            }
                                            dateOfAds = "اليوم" + " " + hour;
                                        } else if (inputDate.setHours(0, 0, 0, 0) == yesterday.setHours(0, 0, 0, 0)) {
                                            for (var i = 0; i < 5; i++) {
                                                hour += dateOfAds.charAt(i);
                                            }
                                            dateOfAds = "الأمس" + " " + hour;
                                        }
                                        console.log(nameOfAds + "***")
                                        content += '<tr  class=' + data.key + '>';
                                        content += '<td>';
                                        content += '<div class="box">';
                                        content += '<div class="image">';
                                        content += '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
                                        content += '<img src=' + imgUrlOfAds + '>';
                                        content += '</div>';
                                        content += '<div class="data" data-toggle="modal" data-target="#centralModalLg-fav">';
                                        content += '<h3 class="ads-name">' + nameOfAds + '</h3>';
                                        content += '<h4 class="ads-price">' + priceOfAds + '&nbsp;ج.م</h4>';
                                        content += '<p class="ads-uther-name">' + nameOfAuther + '</p>';
                                        content += '<hr>';
                                        content += '<p class="ads-date">' + dateOfAds + '</p>';
                                        content += '<p class="ads-location">' + cityOfAds + '</p>';
                                        content += '</div>';
                                        content += '</td>';
                                        content += '</tr>';
                                    } else {
                                        console.log("not fav")
                                    }
                                });
                                $("#fav-table").append(content);
                                // revers the tr to show last added ads first
                                var tbody = $('#fav-table');
                                tbody.html($('tr', tbody).get().reverse());
                                console.log("data showed from faaaav, done !");
                                show_more_details();

                            } else {
                                var node = document.getElementById("fav-table");
                                while (node.hasChildNodes()) {
                                    node.removeChild(node.lastChild);
                                }
                                console.log("no data yet!");
                            }
                        });
                        ////////////////////////////////////
                    } else {
                        $("#pills-profile").css({
                            "background-image": 'url("./images/no-ads2.jpg")',
                            "background-position": "center -20px",
                            "height": "550px",
                            "margin-top": "-30px"
                        });
                        var node = document.getElementById("fav-table");
                        while (node.hasChildNodes()) {
                            node.removeChild(node.lastChild);
                        }
                        console.log("no data yet!");
                    }
                });

                //////////////////////////////////////////////////////////////////////////////////////////////////////

                //////////////////////////////////////////////////////////////////////////////////////////////////////////

                // start show modal with all data when click on ads

                // start show modal with all data when click on ads
                function show_more_details() {
                    $(".box .data").click(function () {
                        console.log('1111')
                        var key_of_ads = $(this).parents(':eq(2)').attr("class");
                        console.log(key_of_ads);
                        var nameOfAds, categoryOfAds, priceOfAds, descOfAds, cityOfAds, personNameOfAds, phoneOfAds, emailOfAds, imgOfAds, dateAds, uidAds;
                        // db query
                        firebase.database().ref("ads").orderByKey().equalTo(key_of_ads).once('value', function (snapshot) {
                            if (snapshot.exists()) {
                                //go through each item found and print out the emails
                                snapshot.forEach(function (data) {
                                    // get data
                                    nameOfAds = data.val().adsName;
                                    categoryOfAds = data.val().category;
                                    priceOfAds = data.val().price;
                                    descOfAds = data.val().description;
                                    cityOfAds = data.val().city;
                                    personNameOfAds = data.val().personName;
                                    phoneOfAds = data.val().phone;
                                    emailOfAds = data.val().email;
                                    imgOfAds = data.val().photoUrl;
                                    dateAds = data.val().postDate;
                                    uidAds = data.val().userId;
                                    // check if date equal to today date
                                    var inputDate = new Date(dateAds);
                                    var todaysDate = new Date();
                                    var yesterday = new Date(todaysDate - 864e5);
                                    var hour = "";
                                    if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
                                        for (var i = 0; i < 5; i++) {
                                            hour += dateAds.charAt(i);
                                        }
                                        dateAds = "اليوم" + " " + hour;
                                    } else if (inputDate.setHours(0, 0, 0, 0) == yesterday.setHours(0, 0, 0, 0)) {
                                        for (var i = 0; i < 5; i++) {
                                            hour += dateAds.charAt(i);
                                        }
                                        dateAds = "الأمس" + " " + hour;
                                    }
                                });

                                // set data to inputs in modal
                                $('#modal_ads_image').attr('src', imgOfAds);
                                $("#modal_ads_name").html(nameOfAds);
                                $("#modal_ads_price").html(priceOfAds + " " + "ج/كجم");
                                $("#modal_ads_category").html("<strong>الصنف : </strong>" + categoryOfAds);
                                $("#modal_ads_disc").html("<strong>الوصف : </strong>" + descOfAds);
                                $("#modal_ads_poster_name").html("<strong>اسم المعلن : </strong>" + personNameOfAds);
                                $("#modal_ads_location").html("<strong>المدينة : </strong>" + cityOfAds);
                                $("#modal_ads_data").html("<strong>تاريخ الإعلان : </strong>" + dateAds);
                                $("#modal_phone").html('<a href="tel:' + phoneOfAds + '">' + phoneOfAds + '</a>' + "<span class='glyphicon glyphicon-earphone' aria-hidden='true'></span>");
                                $("#modal_email").html('<a href="mailto:' + emailOfAds + '" target="_blank" title="أرسل إيميل للمعلن">' + emailOfAds + '</a>' + "<span class='glyphicon glyphicon-envelope' aria-hidden='true'></span>");

                                console.log("done!");


                            } else { // snapshot not exist
                                console.log("no data")
                            }
                        }); // end of db query

                    }); // end of click event


                    // delet ads from fav button action
                    $(".box .image .glyphicon-star").click(function () {
                        $(this).css("color", "lightgray")
                        var key_of_fav_ads1 = $(this).parents(':eq(3)').attr("class");
                        console.log(key_of_fav_ads1 + "----del");
                        // delet fav from database
                        firebase.database().ref('/favoritesAsd/' + uid).orderByKey().on('value', function (snapshot) {
                            if (snapshot.exists()) {
                                //go through each item found and print out the emails
                                snapshot.forEach(function (data) {
                                    if ((data.val().keyOfAds) == key_of_fav_ads1) {
                                        firebase.database().ref('/favoritesAsd/' + uid).child(data.key).remove().then(fun => {
                                            $.notify("تم حذف الإعلان من المفضلة", "error");
                                            //location.reload(true);
                                        });
                                    }
                                });
                            } else {
                                console.log("no data yet!");
                            }
                        }) // end of delet
                    })

                } // end of show_more_details()
                ////////////////////////////////////////////////////////////////////////////////////////////////

            } else {
                // User is signed out.
                console.log("not log in");
                $("#btn-singUp a").attr("href", "log-in.html");
                $("#btn-addAds a").attr("href", "log-in.html");
            }
        }); // end of onAuthStateChanged()

    }()); // end of main function

    // responsive deiting
    var win = $(window).width();
    if (win <= 767) { // mobile screen
        console.log("mobile")
        $("#dash-mneu").click(function () {
            if ($(this).attr('data-click-state') == 1) {
                $(this).attr('data-click-state', 0)
                $(".mobile-menu").css("display", "none");
                $(".mobile-menu").fadeOut(600);
                $("#dash-mneu span").removeClass("glyphicon glyphicon-remove glyphicon")
                $("#dash-mneu span").addClass("glyphicon-align-justify glyphicon")
            } else {
                $(this).attr('data-click-state', 1);
                $(".mobile-menu").css("display", "flex");
                $(".mobile-menu").fadeIn(600);
                $("#dash-mneu span").removeClass("glyphicon-align-justify")
                $("#dash-mneu span").addClass("glyphicon glyphicon-remove")
            }
        })

    }

}); // end of ready function
