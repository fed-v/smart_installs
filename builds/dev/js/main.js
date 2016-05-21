(function($){

    "use strict"; // Start of use strict

    // Style Console Messages: "%c" tells the console that the rest of the message should be formatted
    // using CSS. You can pass the CSS styles as a parameter.
    var consoleStyles = "color:purple; font-weight:bold; margin-left:20px";
    console.log("%c Console with styles added to it.", consoleStyles);


    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */

    $(window).load(function(){

        $(window).trigger("scroll");
        $(window).trigger("resize");

        // Hash menu forwarding
        if (window.location.hash){
            var hash_offset = $(window.location.hash).offset().top;
            $("html, body").animate({
                scrollTop: hash_offset
            });
        }

    });


    $(document).ready(function(){
        $(window).trigger("resize");
        init_scroll_navigate();
        initPageSliders();
        init_map();
        setCopyrightDate();
    });


    $(window).resize(function(){
        js_height_init();
    });


    // Hamburger Menu Handler
  	$('#hamburger-menu').click(function(){
      $(this).toggleClass('open');
  	});


    // Make got to top button dissapear on scroll
    $(window).scroll(function() {
       if ($(document).scrollTop() > 500) {
          $('.btn-go-top').fadeIn('slow');
       }else {
          $('.btn-go-top').fadeOut('slow');
       }
   });


   // Validate Contact Form
   $("#contactForm").submit(function(event) {

      console.log("%c Validating form.", consoleStyles);

      // Get input elements
      var name = document.getElementById("name");
      var email = document.getElementById("email");
      var enquiry = document.getElementById("enquiry");

      // RESET ERROR FIELDS
      name.removeAttribute("class");
      email.removeAttribute("class");
      enquiry.removeAttribute("class");

      // Check empty fields
      if(name.value.length == 0){
         event.preventDefault();
         name.setAttribute("class", "error");
      }

      if(email.value.length == 0){
         event.preventDefault();
         email.setAttribute("class", "error");
      }

      if(enquiry.value.length == 0){
         event.preventDefault();
         enquiry.setAttribute("class", "error");
      }

      // Check alphanumeric
      if ( !enquiry.value.match(/^[a-z A-Z\?\.\!\,0-9]+$/) ) {
         event.preventDefault();
         enquiry.setAttribute("class", "error");
      }

   });




    /* --------------------------------------------
     Platform detect
     --------------------------------------------- */
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    }
    else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }

    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    }
    else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    }
    else {
        safariTest = false;
    }

    // Detect touch devices
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }


    /* ---------------------------------------------
     Sections helpers
     --------------------------------------------- */

    // Sections backgrounds

    var pageSection = $(".home-section, .page-section, .small-section, .split-section");
    pageSection.each(function(indx){

        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

})(jQuery); // End of use strict


/* ---------------------------------------------
Scroll navigation
--------------------------------------------- */
function init_scroll_navigate(){

   $(".local-scroll").localScroll({
       target: "body",
       duration: 1500,
       offset: 0,
       easing: "easeInOutExpo"
   });

   var sections = $(".home-section, .split-section, .page-section");
   var menu_links = $(".scroll-nav li a");

   $(window).scroll(function(){

       sections.filter(":in-viewport:first").each(function(){
           var active_section = $(this);
           var active_link = $('.scroll-nav li a[href="#' + active_section.attr("id") + '"]');
           menu_links.removeClass("active");
           active_link.addClass("active");
       });

   });

}


/* ---------------------------------------------
 Sliders
 --------------------------------------------- */
function initPageSliders(){
    (function($){
        "use strict";

        // Fullwidth slider
        $(".carousel").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            autoPlay: true,
            autoPlaySpeed: 1000,
            autoPlayTimeout: 5000,
            stopOnHover: true,
            loop: true,
            navigationText: ["<img class='arrow flipped' src='images/arrow.png'/>", "<img class='arrow' src='images/arrow.png'/>"]
        });
    })(jQuery);
};


/* ---------------------------------------------
 Height 100%
 --------------------------------------------- */
function js_height_init(){
    (function($){
        $(".js-height-full").height($(window).height());
        $(".js-height-parent").each(function(){
            $(this).height($(this).parent().first().height());
        });
    })(jQuery);
}


/* ---------------------------------------------
 Google maps API
 --------------------------------------------- */

var gmMapDiv = $("#map");

function init_map(){
    (function($){

        //var gmCenterAddress = gmMapDiv.attr("data-address");
        var gmMarkerAddress = "First Canadian Place, Toronto, ON";

        gmMapDiv.gmap3({
            action: "init",
            marker: {
                address: gmMarkerAddress,
                options: {
                    icon: "images/map-marker.png"
                }
            },
            map: {
                options: {
                    zoom: 14,
                    zoomControl: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL
                    },
                    mapTypeControl: false,
                    scaleControl: false,
                    scrollwheel: false,
                    streetViewControl: false,
                    draggable: true,
                    styles: [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
                }
            }
        });

    })(jQuery);
}


/* ---------------------------------------------
 Dynamicaly Set Copyright Date in Footer
 --------------------------------------------- */
function setCopyrightDate(){
    (function($){

        // Create Instance of the Date Object
        var date = new Date();

        // Extract Four Digit Year and Add to Footer
        $("#year").text(date.getFullYear());

    })(jQuery);
}
