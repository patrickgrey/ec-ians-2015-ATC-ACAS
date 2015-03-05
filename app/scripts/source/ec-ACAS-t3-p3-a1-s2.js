;var ec_ACAS_t3_p3_a1_s2 = (function ($, TimelineMax, ecSvgUtilities) {
    
    'use strict';
    
    // Add checking for $ and GSAP with console feedback.
    if($ === null || TimelineMax === null || ecSvgUtilities === null) {
        console.log('jQuery, TimelineMax and ecSvgUtilities are required to animate the SVG. Please ensure you are loading both libraries. Have a nice day :-)');
        return;
    }
    
    var module = {},
        all,
        tl = new TimelineMax(),
        t2 = new TimelineMax();
    
    module.init = function (svgLoaderArgsObject) {
        
        all = all || ecSvgUtilities.getSVGElementsWithID(document.getElementById(svgLoaderArgsObject.svgDocID).getSVGDocument());
        
        $(all.buttonReplay).hide();
        $(all.feedback).hide();
        
        tl.set(all.buttonReplay, {autoAlpha:0})
          .to(all.acft2, 1, {x:"-=81"})
          .set(all.buttonReplay, {display:'block'})
          .to(all.buttonReplay, 0.5, {autoAlpha:1})
          .pause();
          
        t2.to(all.acft1, 1, {x:"+=70", y:"-=32"})
          .pause();
        
        $('.ec-ACAS-t3-p3-a1-s2-question').click(function (event) {
            // console.log($(event.target));
            var clicked = $(event.target).attr('id');
            // $('.ec-ACAS-slide-1-1-text').show().addClass('ec-ACAS-fade-in');
            tl.play();
            t2.play();
            if (clicked === 'ec-ACAS-t3-p3-a1-s2-no' || clicked === 'ec-ACAS-t3-p3-a1-s2-label-no') {
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