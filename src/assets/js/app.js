import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

var localtest = 1;
if (window.location.href.indexOf("localhost:8000") != -1 || window.location.href.indexOf("dev=true") != -1){
    console.warn("Running on local or test instance, js logging is turned on : " + window.location.href);
}else{
    //if (location.protocol !== "https:") location.protocol = "https:";
    localtest = 0;
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

        if(localtest){console.info("Lazy class detected:" + $('.lazy').length);}        
        //script automatically looks for data-source tags and replaces images there is no need to call the script
        //special option can be placed in the async code above

    }else{
        if(localtest){console.warn("No Lazy class detected:" + $('.lazy').length);}
    }

    if($('.active-nav').length){    

        if($('.active-nav').find('li').length){
            if(localtest){console.info('active-nav detected : nav elements present' + $('.active-nav').find('li').length)}
        }else{
            if(localtest){console.warn('No active-nav elements detected : no nav elements, disapearing the nav') + $('.active-nav').find('li').length}
            $('.active-nav').remove();
        }

    }else{
        if(localtest){console.info("active-nav class not detected:" + $('.active-nav').find('li').length);}
    }

    //checks to see if there are any swiper-containers and loads the script via cdn------------
    if($('.swiper-container').length){

        (function(w, d){
            var b = d.getElementsByTagName('body')[0];
            var s = d.createElement("script"); s.async = true;
            s.src = "//cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.6/js/swiper.min.js";
            b.appendChild(s);
        }(window, document));        

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
            if(localtest){console.info("Swiper class detected : Swiper script Loaded");}
        }, 800);
    }else{
        if(localtest){console.warn("No swiper class detected:" + $('.swiper-container').length);}
    }

    if($('.youtube').length){

        $.e.ach(
            $('.youtube'), function(index, value) {                
                $(this).css("background","url('https://img.youtube.com/vi/" + $(this).attr("data-embed") + "/sddefault.jpg') no-repeat");
                $(this).css("background-position","center");
                $(this).css("background-size","cover");
                $(this).click(function(){
                    $(this).find(".play-button").remove();
                    var iframe = document.createElement( "iframe" );
                    iframe.setAttribute( "allowfullscreen", "" );
                    iframe.setAttribute( "title", $(this).attr("data-alt") );
                    iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ $(this).attr("data-embed") +"?rel=0&showinfo=0&autoplay=1" );
                    $(this).innerHTML = $(this).attr("data-alt");
                    $(this).append(iframe); 
                    return false;                    
                });
                if($(this).attr('data-auto') && (window.outerWidth > 640)){
                    $(this).find(".play-button").trigger("click").delay('500');                    
                }
                if($(this).attr('data-auto')){
                    $(this).find(".play-button").remove();             
                }
            }
        ); 
        
        if(localtest){console.info("Youtube class detected : youtube script Loaded");}
    }else{
        //console.log("No Youtube class detected:" + $('.youtube').length);
    }

    if($('.map').length){
        //Google Maps Integration Code------------
        //Google initMap Code has to live in the Footer        

        setTimeout(function(){
            $('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwjWH27OBMiZaiAr9G7cM032Rj13x26_0&callback=initMap" async defer></script>') 
            setTimeout(function(){             
                //SHIM for googlemaps------------
                $('.map iframe').attr('title','Google Map');
                $('.map area').attr('alt','point');
                $('.map img').attr('alt','Google Maps');
                $.each( $('.map span[role|="checkbox"]'), function(index, value) {
                         $(this).attr('aria-description', 'map-control');
                         $(this).hide();
                    }
                ); 
            }, 1000);       
        }, 1000);
        
        console.info("Map class detected : Map script Loaded");
    }else{
        if(localtest){console.warn("No Map class detected:" + $('.map').length);}
    }  

    //temp fix for using the news rss feed and parsing out the first img and its alt text from the article description------
    //will be removed when the press system is in place.
    if($('.news-item').length){
        //news cleanup code ------------    
        var regimg = /src="[A-Za-z0-9 '%()/$._-]*(.png"|.jpg")/g;    
        var regalt = /alt="[A-Za-z0-9 $._-]*"/g;
        var right = 0;
        var actualImage = new Array();
        var img = $('<img>');

        setTimeout(function(){
            $.each(
                $('.news-item'), function(index, value) {
                    //$(value).html('href', $(value).attr('href') + '?url=' + location.href);
                    var str = $(value).find('.description').html();
                    var patt = /src=/;
                    if(patt.test(str)){
                        var imgresult = str.match(regimg);
                        var imgpath = imgresult[0];                        
                        imgpath = imgpath.replace('src=','');
                        imgpath = imgpath.replace('"','');
                        imgpath = imgpath.replace('"','');
                        imgpath = imgpath.replace('\'','\\\'');

                        var altresult = str.match(regalt);
                        var alttext = altresult[0];
                        alttext = alttext.replace('alt=','');
                        alttext = alttext.replace('"','');
                        alttext = alttext.replace('"','');
                        alttext = alttext.replace('\'','\\\'');    

                        $(value).find('img').css('background','url("//www.wtamu.edu' + imgpath + '")');                           
                        $(value).find('img').attr('alt',alttext);
                    }else{
                        $(value).find('img').css('background','url("./assets/img/news/' + Math.floor(Math.random() * 11) + '.jpg');
                        $(value).find('img').attr('alt','transparent background image');
                        $(value).find('img').attr('aria-hidden','true');
                    }
                    $(value).find('.description').remove();
                }
            );                   
        }, 1000);
        
        if(localtest){console.info("news-item class detected : news items script Loaded");}
    }else{
        if(localtest){console.warn("news-item class not detected:" + $('.news-item').length);}
    }  

    //contact form handling 
    //native foundation html is being used to post to spectact contact forms.
    if($('#contact-form').length){
        $(this).find('.message').addClass('hide');
        $('#contact-form').submit(function(event) {          
            $(this).find('.message').removeClass('hide');
            $(this).find('.submit').addClass('hide');
            $(this).find('.submit').addClass('hide');
        }); 
        if(localtest){console.info("No contact-form detected : contact-form items script Loaded");}
    }else{
        if(localtest){console.warn("contact-form not detected:" + $('.contact-form').length);}
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

    //Delayed accessability Fixes------------
    setTimeout(function(){
        //SHIM for wufoo forms (iframe accessability)------------
        $('.wufoo-form-container').attr('title','wufoo form');
        $('iframe').removeAttr('frameborder');
        $('.wufoo-form-container').css('height', $('.wufoo-form-container').attr('height'));
        $('iframe').removeAttr('height');
        $('iframe').removeAttr('scrolling');
        $('html.firefox').attr('lang','en');
    }, 1500);

    //Delayed accessability Detection Code------------
    if (localtest || window.location.href.indexOf("cascadeserver.wtamu.edu") != -1){

        (function(w, d){
            var b = d.getElementsByTagName('body')[0];
            var s = d.createElement("script"); s.async = true;
            s.src = "//cdnjs.cloudflare.com/ajax/libs/axe-core/2.1.7/axe.js";
            b.appendChild(s);
        }(window, document));          
    
        setTimeout(function(){

            var inspect = '#maincontent';
            if (localtest){
                //inspect = 'html';
                inspect = '#maincontent';
            }

            console.warn('AXE will inspect tag and children of ' + inspect);

            axe.run(inspect, function (err, results) {
                var violations = "";
                var html = "";
                if (results.violations.length) {
                    $('.warning-system .content').append('<h2><span class="fa fa-exclamation"> Please Review The Following Errors</span></h2>');
                        $.each(                                                 
                        $(results.violations), function(index, value) {
                            violations += value.description + ' : ' + '\n';
                            $('.warning-system .content').append('<h3 class="cell">' + value.description + '</h3>');
                            html = '';   
                            $.each(
                                $(value.nodes), function(index, value) {
                                    violations += value.html.replace(/\s\s+/i, "").substring(0, 90) + '...\n';   
                                    html += '<div class="cell text-center">' + value.html.replace(/data-src/i, 'width="100%" src') + '</div>';
                                    $(value.target[0]).addClass('violation');                                                              
                                }
                            );
                            $('.warning-system .content').append('<div class="grid-x small-up-5">' + html + '</div>');                           
                        }
                    ); 
                    console.log(violations);
                    $('.warning-system').show();
                    $('.warning-system').addClass('violation');
                    $('.report').attr('href','/report.html?error="' + violations + '" &url="' + location.href + '"');    
                    $('.report').parent().css('background-color','red');                 
                }else{
                    console.info("Passed Axe In Browser Validation Test");
                    $('.report').attr('href', $('.report').attr('href') + '?error="Passed Axe In Browser Validation Test" &url="' + location.href + '"');
                }
                if (localtest){
                    $('.report').parent().show();
                }
                $("html, body").animate({ scrollTop: 0 }, "slow");
            });
        }, 2000);
        if(localtest){console.info("AXE script Loaded");}
    }else{
        $('.report').parent().hide();
        if(localtest){console.warn("AXE script NOT Loaded");}
    }  

    //SHIM for fax numbers, makes the number unclickable, 
    //may be useable in the future as a link
    $('a[href^="fax:"]').click(false);

    //SHIM gets query string elements
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
                console.log(url);
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
        //var options = {year: "numeric", month: "short", day: "numeric", hour12: true, hour: "2-digit", minute: "2-digit" };  
        //var starttimeformatted = new Date($(this).attr('starttime') * 1);
        //var endtimeformatted = new Date($(this).attr('endtime') * 1);
        //console.log(starttimeformatted.toLocaleTimeString([], options));
        //console.log(endtimeformatted.toLocaleTimeString("en-us", options));
        if (localtest || window.location.href.indexOf("scheduler=show") != -1){
            if(localtest){console.warn("Running on local or test instance, out of range scheduler events will not be removed but are labeled");}
            
            $(this).show();
            $(this).css('opacity','.5');
            $(this).css('position','relative');

            //sets the scheduled marker
            if(parseInt($(this).attr('starttime')) && parseInt($(this).attr('endtime'))){
                $(this).append('<div class="scheduled">scheduled</div>'); 
            }
            if($(this).attr('starttime') == "" && parseInt($(this).attr('endtime'))){
                $(this).append('<div class="scheduled">scheduled</div>'); 
            }
            if(parseInt($(this).attr('starttime')) && $(this).attr('endtime') == ""){
                $(this).append('<div class="scheduled">scheduled</div>'); 
            }

            //sets opacity to 100% if the item is currently visible
            if((((new Date()).getTime())) > parseInt($(this).attr('starttime')) && parseInt($(this).attr('endtime')) > ((new Date().getTime()))){
                $(this).css('opacity','1');
            }
            if($(this).attr('starttime') == "" && parseInt($(this).attr('endtime')) > ((new Date().getTime()))){
                $(this).css('opacity','1');
            }
            if((((new Date()).getTime())) > parseInt($(this).attr('starttime')) && $(this).attr('endtime') == ""){
                $(this).css('opacity','1');
            }
            if($(this).attr('starttime') == "" && $(this).attr('endtime') == ""){
                $(this).css('opacity','1');
            }

        }else{
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
        }        
    });      
});