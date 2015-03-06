;var ec_ACAS_t3_p3_a1_s3 = (function ($) {
    
    'use strict';
    
    if($ === null) {
        console.log('jQuery is required for this interaction. Please ensure you are loading both libraries. Have a nice day :-)');
        return;
    }
    
    var stub = 'Aircraft B would receive an RA first.'
    
    // Update feedack depending on which aircraft image is selected.
    $('.ec-acas-t3-p3-a1-s4-img1').click(function (e) {
        e.preventDefault();
        $('#ec-acas-t3-p3-a1-s4-feedback').html('Wrong! :-( ' + stub)
                                          .removeClass('ec-ACAS-feedback-correct').addClass('ec-ACAS-feedback-wrong');
    });
    
    $('.ec-acas-t3-p3-a1-s4-img2').click(function (e) {
        e.preventDefault();
        $('#ec-acas-t3-p3-a1-s4-feedback').html('Correct! :-) ' + stub)
                                          .removeClass('ec-ACAS-feedback-wrong').addClass('ec-ACAS-feedback-correct');
    });
    
    
})(window.$ = window.$ || null);