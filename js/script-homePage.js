$(document).ready(function () {
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
        // end of Intialize
        const db = firebase.database();
        //////////////////////////////
        // handle when user log in or note
        // get inputs / buttun value
        var some_search = document.getElementById("search-some");
        var city_search = document.getElementById("search-city");
        var price_from = document.getElementById("price_from");
        var price_to = document.getElementById("price_to");
        var btn_search = document.getElementById("search-btn");
        var btn_filter = document.getElementById("filter-btn");
        var auth = firebase.auth();
        var em;
        auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                console.log("user");
                console.log(firebaseUser.uid);
                // User is signed in.
                em = firebaseUser.displayName;
                $("#btn-singUp a").html('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>' + em);
                $("#btn-singUp a").attr("href", "user-profile.html");
                $("#btn-addAds a").attr("href", "add-new-ad.html");
                console.log(em);
            } else {
                // User is signed out.
                console.log("not log in");
                $("#btn-singUp a").attr("href", "log-in.html");
                $("#btn-addAds a").attr("href", "log-in.html");
            }
        });
        ///////////////////////////////////////////////////////////////////////////////////////////////
        // start show modal with all data when click on ads
        function show_more_details() { 
            $(".data").click(function () {
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
                        $("#modal_ads_price").html(priceOfAds + " " + "ج.م" + "/ك");
                        $("#modal_ads_category").html("الصنف : " + categoryOfAds);
                        $("#modal_ads_disc").html("الوصف : " + descOfAds);
                        $("#modal_ads_poster_name").html("اسم المعلن : " + personNameOfAds);
                        $("#modal_ads_location").html("المدينة : " + cityOfAds);
                        $("#modal_ads_data").html("تاريخ الإعلان : " + dateAds);
                        $("#modal_phone").html(phoneOfAds + "<span class='glyphicon glyphicon-earphone' aria-hidden='true'></span>");
                        $("#modal_email").html(emailOfAds + "<span class='glyphicon glyphicon-envelope' aria-hidden='true'></span>");

                        console.log("done!");


                    } else { // snapshot not exist
                        console.log("no data")
                    }
                }); // end of db query 

            }); // end of click event


        } // end of show_more_details()
        show_more_details();
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////

        // retrive all ads and show it in table
        function diplay_all_data() {
            db.ref("ads").orderByKey().on('value', function (snapshot) {
                if (snapshot.exists()) {
                    var content = '';
                    //go through each item found and print out the emails
                    snapshot.forEach(function (data) {
                        var chil = document.getElementById("ads-table");
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
                        content += '<tr  class=' + data.key + '>';
                        content += '<td>';
                        content += '<div class="box">';
                        content += '<div class="image">';
                        content += '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
                        content += '<img src=' + imgUrlOfAds + '>';
                        content += '</div>';
                        content += '<div class="data" data-toggle="modal" data-target="#centralModalLg">';
                        content += '<h3 class="ads-name">' + nameOfAds + '</h3>';
                        content += '<h4 class="ads-price">' + priceOfAds +" "+ 'ج.م/ك </h4>';
                        content += '<p class="ads-uther-name">' + nameOfAuther + '</p>';
                        content += '<hr>';
                        content += '<p class="ads-date">' + dateOfAds + '</p>';
                        content += '<p class="ads-location">' + cityOfAds + '</p>';
                        content += '</div>';
                        content += '</div>';
                        content += '</td>';
                        content += '</tr>';
                    });
                    $("#ads-table").append(content);
                    // revers the tr to show last added ads first
                    var tbody = $('#ads-table');
                    tbody.html($('tr', tbody).get().reverse());
                    console.log("data showed, done !");
                    show_more_details();
                    addToFaviort();
                } else {
                    var node = document.getElementById("ads-table");
                    while (node.hasChildNodes()) {
                        node.removeChild(node.lastChild);
                    }
                    console.log("no data yet!");
                }
            });
        } // end of function diplay alla data()
        diplay_all_data();
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////

        // retrive data based on filter value(category/city)
        function category_city_ads(search_child, search_val) {
            db.ref("ads").orderByChild(search_child).equalTo(search_val).on('value', function (snapshot) {
                if (snapshot.exists()) {
                    var content = '';
                    //go through each item found and print out the emails
                    snapshot.forEach(function (data) {
                        var chil = document.getElementById("ads-table");
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
                        content += '<tr class=' + data.key + '>';
                        content += '<td>';

                        content += '<div class="box" >';
                        content += '<div class="image">';
                        content += '<span class="glyphicon glyphicon-star" aria-hidden="true" ></span>';
                        content += '<img src=' + imgUrlOfAds + '>';
                        content += '</div>';
                        content += '<div class="data" data-toggle="modal" data-target="#centralModalLg">';
                        content += '<h3 class="ads-name">' + nameOfAds + '</h3>';
                        content += '<h4 class="ads-price">' + priceOfAds + '&nbsp;ج.م</h4>';
                        content += '<p class="ads-uther-name">' + nameOfAuther + '</p>';
                        content += '<hr>';
                        content += '<p class="ads-date">' + dateOfAds + '</p>';
                        content += '<p class="ads-location">' + cityOfAds + '</p>';
                        content += '</div>';
                        content += '</div>';
                        content += '</td>';
                        content += '</tr>';
                    });
                    $("#ads-table").append(content);
                    // revers the tr to show last added ads first
                    var tbody = $('#ads-table');
                    tbody.html($('tr', tbody).get().reverse());
                    console.log("data showed, done !");
                    show_more_details();
                    addToFaviort();
                } else {
                    var node = document.getElementById("ads-table");
                    while (node.hasChildNodes()) {
                        node.removeChild(node.lastChild);
                    }
                    console.log("no data yet!");
                }
            });
        } // end of category_city_ads()

        //////////////////////////////////////////////////////////////////////////////////////////////

        // action button search
        btn_search.addEventListener("click", function () {
            // show filter button when click search button
            $("#price_filter").css("display", "flex");
            //$("#price_filter").css("flex-direction", "row-reverse");
            // check if category search has value
            if (city_search.value !== "حدد المدينة" && some_search.value !== "حدد الفئة") {
                // retrive all ads
                if (city_search.value == "الكل" && some_search.value == "الكل") {
                    console.log("all");
                    diplay_all_data();
                } else {
                    // retrive data where category and city
                    db.ref("ads").orderByChild("category").equalTo(some_search.value).on('value', function (snapshot) {
                        if (snapshot.exists()) {
                            var content = '';
                            //go through each item found and print out the emails
                            snapshot.forEach(function (data) {
                                var chil = document.getElementById("ads-table");
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
                                if (cityOfAds == city_search.value) {
                                    content += '<tr class=' + data.key + '>';
                                    content += '<td>';

                                    content += '<div class="box" >';
                                    content += '<div class="image">';
                                    content += '<span class="glyphicon glyphicon-star" aria-hidden="true" ></span>';
                                    content += '<img src=' + imgUrlOfAds + '>';
                                    content += '</div>';
                                    content += '<div class="data" data-toggle="modal" data-target="#centralModalLg">';
                                    content += '<h3 class="ads-name">' + nameOfAds + '</h3>';
                                    content += '<h4 class="ads-price">' + priceOfAds + '&nbsp;ج.م</h4>';
                                    content += '<p class="ads-uther-name">' + nameOfAuther + '</p>';
                                    content += '<hr>';
                                    content += '<p class="ads-date">' + dateOfAds + '</p>';
                                    content += '<p class="ads-location">' + cityOfAds + '</p>';
                                    content += '</div>';
                                    content += '</div>';
                                    content += '</td>';
                                    content += '</tr>';
                                } else {
                                    console.log("no match data from 2 prop seach")
                                }
                            }); // end of forEach
                            $("#ads-table").append(content);
                            // revers the tr to show last added ads first
                            var tbody = $('#ads-table');
                            tbody.html($('tr', tbody).get().reverse());
                            console.log("data showed, done !");
                            show_more_details();
                            addToFaviort();
                        } else {
                            var node = document.getElementById("ads-table");
                            while (node.hasChildNodes()) {
                                node.removeChild(node.lastChild);
                            }
                            console.log("no data yet!");
                        }
                    });
                }
            } else if (some_search.value !== "حدد الفئة") {
                if (some_search.value == "الكل") {
                    console.log("all-cat");
                    diplay_all_data();
                } else {
                    // retreve data when category
                    category_city_ads("category", some_search.value);
                }
            } else if (city_search.value !== "حدد المدينة") {
                if (some_search.value == "الكل") {
                    console.log("all-cat");
                    diplay_all_data();
                } else {
                    // retreve data when city
                    category_city_ads("city", city_search.value);
                }
            }
        }); // end of action button search

        //////////////////////////////////////////////////////////////////////////////////////////////

        // action button filter
        btn_filter.addEventListener("click", function () {

            if (city_search.value !== "حدد المدينة" && some_search.value !== "حدد الفئة") {
                // category and city has been selected
                console.log("category and city has been selected");
                if ($("#price_to").val() && $("#price_from").val()) {
                    // category , city , price from , price to has been selected
                    console.log("price from and to have value");
                    // retrive all ads
                    if (city_search.value == "الكل" && some_search.value == "الكل") {
                        console.log("all");
                        diplay_all_data();
                    } else {
                        // retrive data where category , city , price from , price to
                        db.ref("ads").orderByChild("category").equalTo(some_search.value).on('value', function (snapshot) {
                            if (snapshot.exists()) {
                                var content = '';
                                //go through each item found and print out the emails
                                snapshot.forEach(function (data) {
                                    var chil = document.getElementById("ads-table");
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
                                    if (cityOfAds == city_search.value) {
                                        if (+priceOfAds >= +price_from.value && +priceOfAds <= +price_to.value) {
                                            content += '<tr class=' + data.key + '>';
                                            content += '<td>';

                                            content += '<div class="box" >';
                                            content += '<div class="image">';
                                            content += '<span class="glyphicon glyphicon-star" aria-hidden="true" ></span>';
                                            content += '<img src=' + imgUrlOfAds + '>';
                                            content += '</div>';
                                            content += '<div class="data" data-toggle="modal" data-target="#centralModalLg">';
                                            content += '<h3 class="ads-name">' + nameOfAds + '</h3>';
                                            content += '<h4 class="ads-price">' + priceOfAds + '&nbsp;ج.م</h4>';
                                            content += '<p class="ads-uther-name">' + nameOfAuther + '</p>';
                                            content += '<hr>';
                                            content += '<p class="ads-date">' + dateOfAds + '</p>';
                                            content += '<p class="ads-location">' + cityOfAds + '</p>';
                                            content += '</div>';
                                            content += '</div>';
                                            content += '</td>';
                                            content += '</tr>';
                                        } else {
                                            console.log("no match data by price")
                                        }
                                    } else {
                                        console.log("no match data by city")
                                    }
                                }); // end of forEach
                                $("#ads-table").append(content);
                                // revers the tr to show last added ads first
                                var tbody = $('#ads-table');
                                tbody.html($('tr', tbody).get().reverse());
                                console.log("data showed, done !");
                                show_more_details();
                                addToFaviort();
                            } else {
                                var node = document.getElementById("ads-table");
                                while (node.hasChildNodes()) {
                                    node.removeChild(node.lastChild);
                                }
                                console.log("no data yet!");
                            }
                        });
                    }
                } else if ($("#price_to").val()) {
                    // category , city , price to has been selected
                    console.log("price to has value");
                    // retrive all ads
                    if (city_search.value == "الكل" && some_search.value == "الكل") {
                        console.log("all");
                        diplay_all_data();
                    } else {
                        // retrive data where category , city , price from , price to
                        db.ref("ads").orderByChild("category").equalTo(some_search.value).on('value', function (snapshot) {
                            if (snapshot.exists()) {
                                var content = '';
                                //go through each item found and print out the emails
                                snapshot.forEach(function (data) {
                                    var chil = document.getElementById("ads-table");
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
                                    if (cityOfAds == city_search.value) {
                                        if (+priceOfAds <= +price_to.value) {
                                            content += '<tr class=' + data.key + '>';
                                            content += '<td>';

                                            content += '<div class="box" >';
                                            content += '<div class="image">';
                                            content += '<span class="glyphicon glyphicon-star" aria-hidden="true" ></span>';
                                            content += '<img src=' + imgUrlOfAds + '>';
                                            content += '</div>';
                                            content += '<div class="data" data-toggle="modal" data-target="#centralModalLg">';
                                            content += '<h3 class="ads-name">' + nameOfAds + '</h3>';
                                            content += '<h4 class="ads-price">' + priceOfAds + '&nbsp;ج.م</h4>';
                                            content += '<p class="ads-uther-name">' + nameOfAuther + '</p>';
                                            content += '<hr>';
                                            content += '<p class="ads-date">' + dateOfAds + '</p>';
                                            content += '<p class="ads-location">' + cityOfAds + '</p>';
                                            content += '</div>';
                                            content += '</div>';
                                            content += '</td>';
                                            content += '</tr>';
                                        } else {
                                            console.log("no match data by price")
                                        }
                                    } else {
                                        console.log("no match data by city")
                                    }
                                }); // end of forEach
                                $("#ads-table").append(content);
                                // revers the tr to show last added ads first
                                var tbody = $('#ads-table');
                                tbody.html($('tr', tbody).get().reverse());
                                console.log("data showed, done !");
                                show_more_details();
                                addToFaviort();
                            } else {
                                var node = document.getElementById("ads-table");
                                while (node.hasChildNodes()) {
                                    node.removeChild(node.lastChild);
                                }
                                console.log("no data yet!");
                            }
                        });
                    }
                } else if ($("#price_from").val()) {
                    // category , city , price from has been selected
                    console.log("price from has value");
                    // retrive all ads
                    if (city_search.value == "الكل" && some_search.value == "الكل") {
                        console.log("all");
                        diplay_all_data();
                    } else {
                        // retrive data where category , city , price from , price to
                        db.ref("ads").orderByChild("category").equalTo(some_search.value).on('value', function (snapshot) {
                            if (snapshot.exists()) {
                                var content = '';
                                //go through each item found and print out the emails
                                snapshot.forEach(function (data) {
                                    var chil = document.getElementById("ads-table");
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
                                    if (cityOfAds == city_search.value) {
                                        if (+priceOfAds >= +price_from.value) {
                                            content += '<tr class=' + data.key + '>';
                                            content += '<td>';

                                            content += '<div class="box" >';
                                            content += '<div class="image">';
                                            content += '<span class="glyphicon glyphicon-star" aria-hidden="true" ></span>';
                                            content += '<img src=' + imgUrlOfAds + '>';
                                            content += '</div>';
                                            content += '<div class="data" data-toggle="modal" data-target="#centralModalLg">';
                                            content += '<h3 class="ads-name">' + nameOfAds + '</h3>';
                                            content += '<h4 class="ads-price">' + priceOfAds + '&nbsp;ج.م</h4>';
                                            content += '<p class="ads-uther-name">' + nameOfAuther + '</p>';
                                            content += '<hr>';
                                            content += '<p class="ads-date">' + dateOfAds + '</p>';
                                            content += '<p class="ads-location">' + cityOfAds + '</p>';
                                            content += '</div>';
                                            content += '</div>';
                                            content += '</td>';
                                            content += '</tr>';
                                        } else {
                                            console.log("no match data by price")
                                        }
                                    } else {
                                        console.log("no match data by city")
                                    }
                                }); // end of forEach
                                $("#ads-table").append(content);
                                // revers the tr to show last added ads first
                                var tbody = $('#ads-table');
                                tbody.html($('tr', tbody).get().reverse());
                                console.log("data showed, done !");
                                show_more_details();
                                addToFaviort();
                            } else {
                                var node = document.getElementById("ads-table");
                                while (node.hasChildNodes()) {
                                    node.removeChild(node.lastChild);
                                }
                                console.log("no data yet!");
                            }
                        });
                    }
                }

            } // end 1 condition ///////////////////
            else if (some_search.value !== "حدد الفئة") {
                // category has been selected
                console.log("category has been selected")
                if ($("#price_to").val() && $("#price_from").val()) {
                    // category , price from , price to has been selected
                    console.log("price from and to have value");
                    // retrive all ads
                    if (city_search.value == "الكل" && some_search.value == "الكل") {
                        console.log("all");
                        diplay_all_data();
                    } else {
                        // retrive data where category , city , price from , price to
                        db.ref("ads").orderByChild("category").equalTo(some_search.value).on('value', function (snapshot) {
                            if (snapshot.exists()) {
                                var content = '';
                                //go through each item found and print out the emails
                                snapshot.forEach(function (data) {
                                    var chil = document.getElementById("ads-table");
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
                                    if (+priceOfAds >= +price_from.value && +priceOfAds <= +price_to.value) {
                                        content += '<tr class=' + data.key + '>';
                                        content += '<td>';

                                        content += '<div class="box" >';
                                        content += '<div class="image">';
                                        content += '<span class="glyphicon glyphicon-star" aria-hidden="true" ></span>';
                                        content += '<img src=' + imgUrlOfAds + '>';
                                        content += '</div>';
                                        content += '<div class="data" data-toggle="modal" data-target="#centralModalLg">';
                                        content += '<h3 class="ads-name">' + nameOfAds + '</h3>';
                                        content += '<h4 class="ads-price">' + priceOfAds + '&nbsp;ج.م</h4>';
                                        content += '<p class="ads-uther-name">' + nameOfAuther + '</p>';
                                        content += '<hr>';
                                        content += '<p class="ads-date">' + dateOfAds + '</p>';
                                        content += '<p class="ads-location">' + cityOfAds + '</p>';
                                        content += '</div>';
                                        content += '</div>';
                                        content += '</td>';
                                        content += '</tr>';
                                    } else {
                                        console.log("no match data by city")
                                    }
                                }); // end of forEach
                                $("#ads-table").append(content);
                                // revers the tr to show last added ads first
                                var tbody = $('#ads-table');
                                tbody.html($('tr', tbody).get().reverse());
                                console.log("data showed, done !");
                                show_more_details();
                                addToFaviort();
                            } else {
                                var node = document.getElementById("ads-table");
                                while (node.hasChildNodes()) {
                                    node.removeChild(node.lastChild);
                                }
                                console.log("no data yet!");
                            }
                        });
                    }
                } else if ($("#price_to").val()) {
                    // category , price to has been selected
                    console.log("price to has value");
                    // retrive all ads
                    if (city_search.value == "الكل" && some_search.value == "الكل") {
                        console.log("all");
                        diplay_all_data();
                    } else {
                        // retrive data where category , city , price from , price to
                        db.ref("ads").orderByChild("category").equalTo(some_search.value).on('value', function (snapshot) {
                            if (snapshot.exists()) {
                                var content = '';
                                //go through each item found and print out the emails
                                snapshot.forEach(function (data) {
                                    var chil = document.getElementById("ads-table");
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
                                    if (+priceOfAds <= +price_to.value) {
                                        content += '<tr class=' + data.key + '>';
                                        content += '<td>';

                                        content += '<div class="box" >';
                                        content += '<div class="image">';
                                        content += '<span class="glyphicon glyphicon-star" aria-hidden="true" ></span>';
                                        content += '<img src=' + imgUrlOfAds + '>';
                                        content += '</div>';
                                        content += '<div class="data" data-toggle="modal" data-target="#centralModalLg">';
                                        content += '<h3 class="ads-name">' + nameOfAds + '</h3>';
                                        content += '<h4 class="ads-price">' + priceOfAds + '&nbsp;ج.م</h4>';
                                        content += '<p class="ads-uther-name">' + nameOfAuther + '</p>';
                                        content += '<hr>';
                                        content += '<p class="ads-date">' + dateOfAds + '</p>';
                                        content += '<p class="ads-location">' + cityOfAds + '</p>';
                                        content += '</div>';
                                        content += '</div>';
                                        content += '</td>';
                                        content += '</tr>';
                                    } else {
                                        console.log("no match data by city")
                                    }
                                }); // end of forEach
                                $("#ads-table").append(content);
                                // revers the tr to show last added ads first
                                var tbody = $('#ads-table');
                                tbody.html($('tr', tbody).get().reverse());
                                console.log("data showed, done !");
                                show_more_details();
                                addToFaviort();
                            } else {
                                var node = document.getElementById("ads-table");
                                while (node.hasChildNodes()) {
                                    node.removeChild(node.lastChild);
                                }
                                console.log("no data yet!");
                            }
                        });
                    }
                } else if ($("#price_from").val()) {
                    // category , price from has been selected
                    console.log("price from has value");
                    // retrive all ads
                    if (city_search.value == "الكل" && some_search.value == "الكل") {
                        console.log("all");
                        diplay_all_data();
                    } else {
                        // retrive data where category , city , price from , price to
                        db.ref("ads").orderByChild("category").equalTo(some_search.value).on('value', function (snapshot) {
                            if (snapshot.exists()) {
                                var content = '';
                                //go through each item found and print out the emails
                                snapshot.forEach(function (data) {
                                    var chil = document.getElementById("ads-table");
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
                                    if (+priceOfAds >= +price_from.value) {
                                        content += '<tr class=' + data.key + '>';
                                        content += '<td>';

                                        content += '<div class="box" >';
                                        content += '<div class="image">';
                                        content += '<span class="glyphicon glyphicon-star" aria-hidden="true" ></span>';
                                        content += '<img src=' + imgUrlOfAds + '>';
                                        content += '</div>';
                                        content += '<div class="data" data-toggle="modal" data-target="#centralModalLg">';
                                        content += '<h3 class="ads-name">' + nameOfAds + '</h3>';
                                        content += '<h4 class="ads-price">' + priceOfAds + '&nbsp;ج.م</h4>';
                                        content += '<p class="ads-uther-name">' + nameOfAuther + '</p>';
                                        content += '<hr>';
                                        content += '<p class="ads-date">' + dateOfAds + '</p>';
                                        content += '<p class="ads-location">' + cityOfAds + '</p>';
                                        content += '</div>';
                                        content += '</div>';
                                        content += '</td>';
                                        content += '</tr>';
                                    } else {
                                        console.log("no match data by city")
                                    }
                                }); // end of forEach
                                $("#ads-table").append(content);
                                // revers the tr to show last added ads first
                                var tbody = $('#ads-table');
                                tbody.html($('tr', tbody).get().reverse());
                                console.log("data showed, done !");
                                show_more_details();
                                addToFaviort();
                            } else {
                                var node = document.getElementById("ads-table");
                                while (node.hasChildNodes()) {
                                    node.removeChild(node.lastChild);
                                }
                                console.log("no data yet!");
                            }
                        });
                    }
                }
            } // end 2 condition ////////////////////
            else if (city_search.value !== "حدد المدينة") {
                // city has been selected
                console.log("city has been selected")
                if ($("#price_to").val() && $("#price_from").val()) {
                    // city , price from , price to has been selected
                    console.log("price from and to have value");
                    // retrive all ads
                    if (city_search.value == "الكل" && some_search.value == "الكل") {
                        console.log("all");
                        diplay_all_data();
                    } else {
                        // retrive data where category , city , price from , price to
                        db.ref("ads").orderByChild("city").equalTo(city_search.value).on('value', function (snapshot) {
                            if (snapshot.exists()) {
                                var content = '';
                                //go through each item found and print out the emails
                                snapshot.forEach(function (data) {
                                    var chil = document.getElementById("ads-table");
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
                                    if (+priceOfAds >= +price_from.value && +priceOfAds <= +price_to.value) {
                                        content += '<tr class=' + data.key + '>';
                                        content += '<td>';

                                        content += '<div class="box" >';
                                        content += '<div class="image">';
                                        content += '<span class="glyphicon glyphicon-star" aria-hidden="true" ></span>';
                                        content += '<img src=' + imgUrlOfAds + '>';
                                        content += '</div>';
                                        content += '<div class="data" data-toggle="modal" data-target="#centralModalLg">';
                                        content += '<h3 class="ads-name">' + nameOfAds + '</h3>';
                                        content += '<h4 class="ads-price">' + priceOfAds + '&nbsp;ج.م</h4>';
                                        content += '<p class="ads-uther-name">' + nameOfAuther + '</p>';
                                        content += '<hr>';
                                        content += '<p class="ads-date">' + dateOfAds + '</p>';
                                        content += '<p class="ads-location">' + cityOfAds + '</p>';
                                        content += '</div>';
                                        content += '</div>';
                                        content += '</td>';
                                        content += '</tr>';
                                    } else {
                                        console.log("no match data by city")
                                    }
                                }); // end of forEach
                                $("#ads-table").append(content);
                                // revers the tr to show last added ads first
                                var tbody = $('#ads-table');
                                tbody.html($('tr', tbody).get().reverse());
                                console.log("data showed, done !");
                                show_more_details();
                                addToFaviort();
                            } else {
                                var node = document.getElementById("ads-table");
                                while (node.hasChildNodes()) {
                                    node.removeChild(node.lastChild);
                                }
                                console.log("no data yet!");
                            }
                        });
                    }
                } else if ($("#price_to").val()) {
                    // city , price to has been selected
                    console.log("price to has value");
                    // retrive all ads
                    if (city_search.value == "الكل" && some_search.value == "الكل") {
                        console.log("all");
                        diplay_all_data();
                    } else {
                        // retrive data where category , city , price from , price to
                        db.ref("ads").orderByChild("city").equalTo(city_search.value).on('value', function (snapshot) {
                            if (snapshot.exists()) {
                                var content = '';
                                //go through each item found and print out the emails
                                snapshot.forEach(function (data) {
                                    var chil = document.getElementById("ads-table");
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
                                    if (+priceOfAds <= +price_to.value) {
                                        content += '<tr class=' + data.key + '>';
                                        content += '<td>';

                                        content += '<div class="box" >';
                                        content += '<div class="image">';
                                        content += '<span class="glyphicon glyphicon-star" aria-hidden="true" ></span>';
                                        content += '<img src=' + imgUrlOfAds + '>';
                                        content += '</div>';
                                        content += '<div class="data" data-toggle="modal" data-target="#centralModalLg">';
                                        content += '<h3 class="ads-name">' + nameOfAds + '</h3>';
                                        content += '<h4 class="ads-price">' + priceOfAds + '&nbsp;ج.م</h4>';
                                        content += '<p class="ads-uther-name">' + nameOfAuther + '</p>';
                                        content += '<hr>';
                                        content += '<p class="ads-date">' + dateOfAds + '</p>';
                                        content += '<p class="ads-location">' + cityOfAds + '</p>';
                                        content += '</div>';
                                        content += '</div>';
                                        content += '</td>';
                                        content += '</tr>';
                                    } else {
                                        console.log("no match data by city")
                                    }
                                }); // end of forEach
                                $("#ads-table").append(content);
                                // revers the tr to show last added ads first
                                var tbody = $('#ads-table');
                                tbody.html($('tr', tbody).get().reverse());
                                console.log("data showed, done !");
                                show_more_details();
                                addToFaviort();
                            } else {
                                var node = document.getElementById("ads-table");
                                while (node.hasChildNodes()) {
                                    node.removeChild(node.lastChild);
                                }
                                console.log("no data yet!");
                            }
                        });
                    }
                } else if ($("#price_from").val()) {
                    // city , price from has been selected
                    console.log("price from has value");
                    // retrive all ads
                    if (city_search.value == "الكل" && some_search.value == "الكل") {
                        console.log("all");
                        diplay_all_data();
                    } else {
                        // retrive data where category , city , price from , price to
                        db.ref("ads").orderByChild("city").equalTo(city_search.value).on('value', function (snapshot) {
                            if (snapshot.exists()) {
                                var content = '';
                                //go through each item 
                                snapshot.forEach(function (data) {
                                    var chil = document.getElementById("ads-table");
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
                                    if (+priceOfAds >= +price_from.value) {
                                        content += '<tr class=' + data.key + '>';
                                        content += '<td>';
                                        content += '<div class="box" >';
                                        content += '<div class="image">';
                                        content += '<span class="glyphicon glyphicon-star" aria-hidden="true" ></span>';
                                        content += '<img src=' + imgUrlOfAds + '>';
                                        content += '</div>';
                                        content += '<div class="data" data-toggle="modal" data-target="#centralModalLg">';
                                        content += '<h3 class="ads-name">' + nameOfAds + '</h3>';
                                        content += '<h4 class="ads-price">' + priceOfAds + '&nbsp;ج.م</h4>';
                                        content += '<p class="ads-uther-name">' + nameOfAuther + '</p>';
                                        content += '<hr>';
                                        content += '<p class="ads-date">' + dateOfAds + '</p>';
                                        content += '<p class="ads-location">' + cityOfAds + '</p>';
                                        content += '</div>';
                                        content += '</div>';
                                        content += '</td>';
                                        content += '</tr>';
                                    } else {
                                        console.log("no match data by city")
                                    }
                                }); // end of forEach
                                $("#ads-table").append(content);
                                // revers the tr to show last added ads first
                                var tbody = $('#ads-table');
                                tbody.html($('tr', tbody).get().reverse());
                                console.log("data showed, done !");
                                show_more_details();
                                addToFaviort();
                            } else {
                                var node = document.getElementById("ads-table");
                                while (node.hasChildNodes()) {
                                    node.removeChild(node.lastChild);
                                }
                                console.log("no data yet!");
                            }
                        });
                    }
                }
            } // end 3 condition

        }); // end of action button filter

        //////////////////////////////////////////////////////////////////////////////////////////////

        // favorites ads function
        function addToFaviort() {
           

            $('.glyphicon-star').on('click', function () {
                
                auth.onAuthStateChanged(firebaseUser => {
                    if (firebaseUser) {
                        // User is signed in.
                        var userID = firebaseUser.uid;
                        var keyOfAds;
                        if ($(this).attr('data-click-state') == 1) { // clicked secound time
                            $(this).attr('data-click-state',0)
                            $(this).css("color", "lightgray")
                            var key_of_fav_ads1 = $(this).parents(':eq(3)').attr("class");
                            console.log(key_of_fav_ads1 + "----del");
                            // delet fav from database
                            db.ref('/favoritesAsd/' + userID).orderByKey().on('value', function (snapshot) {
                                if (snapshot.exists()) {
                                    //go through each item found and print out the emails
                                    snapshot.forEach(function (data) {
                                        if ((data.val().keyOfAds) == key_of_fav_ads1) {
                                            db.ref('/favoritesAsd/' + userID).child(data.key).remove().then(fun => {
                                                $.notify("تم حذف الإعلان من المفضلة", "error");
                                                //location.reload(true);
                                            });
                                        }
                                    });
                                } else {
                                    console.log("no data yet!"); 
                                }
                            }) // end of delet
                            
                        } else { // clicked first tome
                            $(this).attr('data-click-state', 1)
                            $(this).css("color", "#3fc3c7")
                            var key_of_fav_ads2 = $(this).parents(':eq(3)').attr("class");
                            console.log(key_of_fav_ads2 + "----add");
                            // add to fav in database
                            db.ref('/favoritesAsd/' + userID).push({
                                keyOfAds: key_of_fav_ads2
                            }).then(fun => {
                                $.notify("تم إضافة الإعلان إلى المفضلة", "success");
                            })
                            
                        }
                    } else {
                        // User is signed out.
                        $.notify("يجب تسجيل الدخول أولا", "error");
                    }
                }); // end of onAuthStateChanged()
            }); // end of on clicl event()
        } // end of addToFaviort()

        //////////////////////////////////////////////////////////////////////////////////////////

    }()); // end of main fnuction()
    
       // responsive deiting
    var win=$(window).width();
    if (win<=767){ // mobile screen
        console.log("mobile")
        $("#dash-mneu").click(function(){
            if($(this).attr('data-click-state') == 1){
                $(this).attr('data-click-state',0)
                $(".mobile-menu").css("display","none");
                $(".mobile-menu").fadeOut(400);
                $("#dash-mneu span").removeClass("glyphicon glyphicon-remove glyphicon")
                $("#dash-mneu span").addClass("glyphicon-align-justify glyphicon")
            }else{
                $(this).attr('data-click-state', 1);
                $(".mobile-menu").css("display","flex");
                $(".mobile-menu").fadeIn(400);
                $("#dash-mneu span").removeClass("glyphicon-align-justify")
                $("#dash-mneu span").addClass("glyphicon glyphicon-remove")   
            }
        })
        
    }
}); // end of ready function()

 

