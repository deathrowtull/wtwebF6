import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

if (window.location.href.indexOf("localhost") != -1){
    console.log("Running on local or test instance, https is not enforced: " + window.location.href);
}else{
    if (location.protocol !== "https:") location.protocol = "https:";
}

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';
$(document).ready(function () {  
    $(document).foundation();

    //checks to see if there are any lazy selectors and loads the script via cdn------------
    if($('.lazy').length){    

        (function(w, d){
            var b = d.getElementsByTagName('body')[0];
            var s = d.createElement("script"); s.async = true;
            var v = !("IntersectionObserver" in w) ? "8.5.2" : "10.3.5";
            s.src = "//cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/" + v + "/lazyload.min.js";
            w.lazyLoadOptions = {}; // Your options here. See "recipes" for more information about async.
            b.appendChild(s);
        }(window, document));

        console.log("Lazy class detected:" + $('.lazy').length);
        //script automatically looks for data-source tags and replaces images there is no need to call the script
        //special option can be placed in the async code above

    }else{
        console.log("No Lazy class detected:" + $('.lazy').length);
    }

    //checks to see if there are any swiper-containers and loads the script via cdn------------
    if($('.swiper-container').length){

        (function(w, d){
            var b = d.getElementsByTagName('body')[0];
            var s = d.createElement("script"); s.async = true;
            s.src = "//cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.6/js/swiper.min.js";
            b.appendChild(s);
        }(window, document));

        console.log("Swiper class detected : Swiper script Loaded");

        setTimeout(function(){

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
            console.log("Swiper Class Init");
        }, 500);
    }else{
        console.log("No swiper class detected:" + $('.swiper-container').length);
    }

    if($('.youtube').length){
        ( function() {

            var youtube = document.querySelectorAll( ".youtube" );
            
            for (var i = 0; i < youtube.length; i++) {
                
                var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg";
                
                var image = new Image();
                        image.src = source;
                        image.alt = youtube[i].dataset.alt
                        image.addEventListener( "load", function() {
                            youtube[ i ].appendChild( image );
                        }( i ) );
                
                        youtube[i].addEventListener( "click", function() {

                            var iframe = document.createElement( "iframe" );

                                iframe.setAttribute( "frameborder", "0" );
                                iframe.setAttribute( "allowfullscreen", "" );
                                iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );

                                this.innerHTML = "";
                                this.appendChild( iframe );
                        } );    
                    };                
                } 
            )
        ();
        console.log("Youtube class detected : Swiper script Loaded");
    }else{
        console.log("No Youtube class detected:" + $('.youtube').length);
    }

    if($('.map').length){
        //Google Maps Integration Code------------
        //Google initMap Code has to live in the Footer        

        setTimeout(function(){
            $('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwjWH27OBMiZaiAr9G7cM032Rj13x26_0&callback=initMap" async defer></script>')        
        }, 1000);
        
        console.log("Map class detected : Map script Loaded");
    }else{
        console.log("No Map class detected:" + $('.map').length);
    }    
});



//generic functions that do not need to be lazy loaded-----------------------------
$(document).ready(function () {

    //gets url and appends it to the query string of the object that gets clicked------------
    $.each(
        $('.geturl'), function(index, value) {
            $(value).attr('href', $(value).attr('href') + '?url=' + location.href);
        }
    );   

    $('a[href^="fax:"]').click(false);

    (function($) {
    
        var wtfunc;
        
        wtfunc = {
            getParameterByName : function(name, url) {
                //parses query strings for parameters
                /////////////////see example below
                //var q = getParameterByName('q');  
                //////////////////////////////////            
                if (!url) {
                  url = window.location.href;
                }
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));             
            },
            bodyInfo : function() {
                alert($('body').attr('id'));
            }
        };
        
        window.wf = wtfunc;
        
    })(this.jQuery); 

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


    //Header code Not Currently in production-----------
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