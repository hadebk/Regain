$(document).ready(function(){
    
    // init nice scroll plugin
    $("html").niceScroll({
        cursorcolor: "#1bbc9b",
        cursorwidth: "8px",
        cursorborder: "0px",
    });
    
    //show box when hover on photo 
    function show1(par1,par2){
    $("#"+par1).hover(
        function(){
        $("#"+par2).css("visibility","visible");
        },
        function(){
        $("#"+par2).css("visibility","hidden");
        });
    }
    // end function
    
    // call show1() function 
    show1("por-1","on-hover-div1");
    show1("por-2","on-hover-div2");
    show1("por-3","on-hover-div3");
    show1("por-4","on-hover-div4");
    show1("por-5","on-hover-div5");
    show1("por-6","on-hover-div6");
    
    // height of sloder's photo
    $("#myCarousel img").height($(window).height()-50);
    
    // animation on progress bar
    function animate1(par11, par22, par33, par44){
        $("#"+par11).hover(function(){
            $("#"+par22).attr("style", par33);
        },
        function(){
            $("#"+par22).attr("style", par44); 
        });
        
    }
    
    // call animate1() function
    animate1("div-of-prog1","prog1","width:20%","width:90%");
    animate1("div-of-prog2","prog2","width:20%","width:85%");
    animate1("div-of-prog3","prog3","width:20%","width:98%");
    animate1("div-of-prog4","prog4","width:20%","width:88%");
    
    
    // scroll to top button
    var scr=$("#btn-top");
    $(window).scroll(function(){
        if($(this).scrollTop() >=1000){
            scr.show();
        }else{
            scr.hide();
        }
    });
    
    // action on button (scroll to top)
    $("#div-scroll").click(function(){
       $("html,body").animate({scrollTop:0},600); 
    });
    
    // smooth scroll to section when click on it in navbar 
    $("#myNavbar li a").click(function(){
       $("html,body").animate({
           scrollTop : $("#" + $(this).data("value")).offset().top +20
       },1000); 
    });
    
    // animation down icons
    function animateDownIcon(){
        $(".glyphicon-chevron-down").animate({top:"5px"},200,function(){
        $(this).animate({top:"0px"},200,function(){animateDownIcon();});});
    }
    animateDownIcon();
    
});














