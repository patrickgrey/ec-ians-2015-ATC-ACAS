;var ec_ACAS_t4_p1_a1_s4 = (function ($) {
    
    'use strict';
    
    // Add checking for $ and GSAP with console feedback.
    if($ === null) {
        console.log('jQuery is required to animate the SVG. Please ensure you are loading both libraries. Have a nice day :-)');
        return;
    }
    
    var module = {};
    
    $('.ec-ACAS-t4-p1-a1-s4-launch').click(function(){
        $('.ec-ACAS-t4-p1-a1-s4-window').show();
    });
    
    $('.ec-ACAS-t4-p1-a1-s4-window-close').click(function(){
        $('.ec-ACAS-t4-p1-a1-s4-window').hide();
    });
    
    return module;
    
    
})(window.$ = window.$ || null);