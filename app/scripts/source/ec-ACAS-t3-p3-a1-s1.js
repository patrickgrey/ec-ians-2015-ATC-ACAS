;var ec_ACAS_t3_p3_a1_s1 = (function ($, TimelineMax, ecSvgUtilities) {
    
    'use strict';
    
    // Add checking for $ and GSAP with console feedback.
    if($ === null || TimelineMax === null || ecSvgUtilities === null) {
        console.log('jQuery, TimelineMax and ecSvgUtilities are required to animate the SVG. Please ensure you are loading both libraries. Have a nice day :-)');
        return;
    }
    
    var module = {},
        all,
        tl = new TimelineMax(),
        t2 = new TimelineMax(),
        t3 = new TimelineMax();
    
    module.init = function (svgLoaderArgsObject) {
        
        all = all || ecSvgUtilities.getSVGElementsWithID(document.getElementById(svgLoaderArgsObject.svgDocID).getSVGDocument());
        
        tl.set(all.radius, {x:"25", y:"-30"})
          .to(all.radius, 5, {scaleX:1.5, scaleY:1.1})
          .to(all.radius, 5, {scaleX:1, scaleY:1})
          .pause();
          
        t2.set(all.acft1, {x:"0", y:"30", transformOrigin:"3px -50px"})
          .to(all.acft1, 10, {rotation:-90})
          .pause();
        
        t3.set(all.rate, {transformOrigin:"0 bottom"})
          .to(all.rate, 5, {scaleY:1.5})
          .to(all.rate, 5, {scaleY:1})
          .pause();
        
        // tl.timeScale(1) // try 4 for super speed!
        
        function updateAnimation(sliderValue) {
            tl.pause();
            t2.pause();
            t3.pause();
            //adjust the timeline's progress() based on slider value
            tl.progress( sliderValue/100 );
            t2.progress( sliderValue/100 );
            t3.progress( sliderValue/100 );
        }
        
        $(".ec-ACAS-t3-p3-a1-s1-slider").on("input", function(){updateAnimation(this.value)});
        $(".ec-ACAS-t3-p3-a1-s1-slider").on("change", function(){updateAnimation(this.value)});
        
        $('.ec-ACAS-slide-1-1-question').click(function (event) {
            // console.log($(event.target));
            var clicked = $(event.target).attr('id');
            // $('.ec-ACAS-slide-1-1-text').show().addClass('ec-ACAS-fade-in');
            $('.ec-ACAS-slide-1-1-text').fadeIn();
            if (clicked === 'ec-ACAS-slide-1-1-label-no' || clicked === 'ec-ACAS-slide-1-1-no') {
                // $('.ec-ACAS-page-1-1-feedback').show();
                $('.ec-ACAS-slide-1-1-feedback').html('Correct! :-)').removeClass('ec-ACAS-slide-1-1-feedback-wrong').show();
            }
            else {
                $('.ec-ACAS-slide-1-1-feedback').html('Wrong! :-(').addClass('ec-ACAS-slide-1-1-feedback-wrong').show();
            }
        });
        
    };
    
    // $('.ec-ACAS-t3-p3-a1-s1-slider').change(function (event) {
    //     console.log('slider', this.value);
    // });
    
    
    return module;
    
    
})(window.$ = window.$ || null, window.TimelineMax = window.TimelineMax || null, window.ecSvgUtilities = window.ecSvgUtilities || null);