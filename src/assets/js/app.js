import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';
$(document).ready(function () {  
    $(document).foundation();
});

//checks to see if there are any lazy selectors and loads the script via cdn------------
//if($('.lazy').length){    

    // (function(w, d){
    //     var b = d.getElementsByTagName('body')[0];
    //     var s = d.createElement("script"); s.async = true;
    //     var v = !("IntersectionObserver" in w) ? "8.5.2" : "10.3.5";
    //     s.src = "//cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/" + v + "/lazyload.min.js";
    //     w.lazyLoadOptions = {}; // Your options here. See "recipes" for more information about async.
    //     b.appendChild(s);
    // }(window, document));

    $(document).ready(function () {  
        var myLazyLoad = new LazyLoad({
            elements_selector: ".lazy"
        });
    });
//}

//checks to see if there are any swiper-containers and loads the script via cdn------------
//if($('.swiper-container').length){

    // (function(w, d){
    //     var b = d.getElementsByTagName('body')[0];
    //     var s = d.createElement("script"); s.async = true;
    //     s.src = "//cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.6/js/swiper.min.js";
    //     b.appendChild(s);
    // }(window, document));

    $(document).ready(function () {  

    //Slider Code------------------
        $('.swiper-container').each(function (index) {   

            var phone = $(this).attr('data-phone-slides');  
            if (!phone) {
                    phone = 1;
                } 

            var tablet = $(this).attr('data-tablet-slides');  
            if (!tablet) {
                    tablet = 1;
                }

            var desktop = $(this).attr('data-desktop-slides');  
            if (!desktop) {
                    desktop = 1;
                }

            var time = $(this).attr('data-time');  
            if (!time) {
                    time = 1000000;
                }

            var loop = $(this).attr('data-loop');  
            if (!loop) {
                    loop = false;
                }

            var swiper = new Swiper($(this)[0], {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                keyboard: {
                    enabled: true,
                },
                autoplay: {
                    delay: time,
                    disableOnInteraction: true,
                },
                loop: loop,
                lazy: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                slidesPerView: desktop,
                spaceBetween: 30,
                breakpoints: {            
                    1024: {
                        slidesPerView: tablet,
                        spaceBetween: 30,
                    },
                    640: {
                        slidesPerView: phone,
                        spaceBetween: 30,
                    }
                }
            }); 
        });
    });
//}

//generic functions that do not need to be lazy loaded-----------------------------
$(document).ready(function () {

    //gets url and appends it to the query string of the object that gets clicked------------
    $.each(
        $('.geturl'), function(index, value) {
            $(value).attr('href', $(value).attr('href') + '?url=' + location.href);
        }
    );

    //parses query strings for parameters
    /////////////////see example below
    //var q = getParameterByName('q');  
    //////////////////////////////////
    function getParameterByName(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
    }  

    //scheduler uses unix time to stamp to display and hide elements on a page
    //---------------------------------see usage below-------------------------
    //class="scheduler" style="display:none" starttime="1507642200000" endtime="1507690800000"
    //-------------------------------------------------------------------------
    $('.scheduler').each(function( index, value ) {
        $(this).hide();
        if((((new Date()).getTime())) > parseInt($(this).attr('starttime')) && parseInt($(this).attr('endtime')) > ((new Date().getTime()))){
            $(this).show();
        }
        if($(this).attr('starttime') == "" && parseInt($(this).attr('endtime')) > ((new Date().getTime()))){
            $(this).show();
        }
        if((((new Date()).getTime())) > parseInt($(this).attr('starttime')) && $(this).attr('endtime') == ""){
            $(this).show();
        }
        if($(this).attr('starttime') == "" && $(this).attr('endtime') == ""){
            $(this).show();
        }
    });  

// //Google Maps Integration Code------------
//     function initMap() {
        
//         $('.map').each(function (index, Element) {
//             var location = $(Element).attr("data-location").split(",");
//             var zoom = $(Element).attr("data-zoom");
//             var name = $(Element).attr("data-name");

//             if (location.length != 2) {
//                 $(this).display = "none";
//                 return;
//             }

//             if (!zoom) {
//                 zoom = 17;
//             }

//             if (!name) {
//                 name = " ";
//             }

//             var latlng = new google.maps.LatLng(parseFloat(location[0]), parseFloat(location[1]));
//             var myOptions = {
//                 zoom: parseFloat(zoom),
//                 center: latlng,
//                 mapTypeId: google.maps.MapTypeId.ROADMAP,
//                 disableDefaultUI: false,
//                 mapTypeControl: true,
//                 zoomControl: true,
//                 zoomControlOptions: {
//                     style: google.maps.ZoomControlStyle.SMALL
//                 }
//             };
//             var map = new google.maps.Map(Element, myOptions);

//             var marker = new google.maps.Marker({
//                 position: latlng,
//                 map: map,
//                 animation: google.maps.Animation.DROP,
//                 label: {
//                     color: '#111',
//                     fontWeight: 'bold',
//                     text: name,
//                 }
//             });
//         });
//     }

//Header code Not Currently Necessary------------
    // var shrinkHeader = 10;
    // $(window).scroll(function(e) {        
    //     var scroll = getScrollOffsets();        
    //     if ( scroll >= shrinkHeader ) {
    //         $('.logo-wrapper .logo').removeClass('large');
    //     }
    //     else {
    //         $('.logo-wrapper .logo').addClass('large');
    //     }        
    // });

    // function getCurrentScroll() {
    //     return window.pageYOffset;
    // }

    // // Return the current scrollbar offsets as the x and y properties of an object
    // function getScrollOffsets() {
    //     // This works for all browsers except IE versions 8 and before
    //     if ( window.pageXOffset != null ) {
    //         return window.pageYOffset;            
    //     }
    //     // For browsers in Standards mode
    //     var doc = window.document;
    //     if ( document.compatMode === "CSS1Compat" ) {

    //         return doc.documentElement.scrollTop;
    //     }
    //     // For browsers in Quirks mode
    //     return doc.body.scrollTop;        
    // }
    
});

