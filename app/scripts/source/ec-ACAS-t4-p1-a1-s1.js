;var ec_ACAS_t4_p1_a1_s1 = (function ($, TimelineMax, ecSvgUtilities) {
    
    'use strict';
    
    // Add checking for $ and GSAP with console feedback.
    if($ === null || TimelineMax === null || ecSvgUtilities === null) {
        console.log('jQuery, TimelineMax and ecSvgUtilities are required to animate the SVG. Please ensure you are loading both libraries. Have a nice day :-)');
        return;
    }
    
    var module = {},
        currentItem = 0;
    
    $('.ec-acas-t4-p1-a1-s1-activity-open').click(function () {
        currentItem = $(this).attr('data-order');
        $(this).parent().fadeTo(0, 1);
        $('.ec-acas-t4-p1-a1-s1-activity-open').each(function () {
            if (currentItem != $(this).attr('data-order')) {
                $(this).parent().fadeTo(0.5, 0.3);
            };
        });
        $('.ec-acas-t4-p1-a1-s1-activity-answers').css({'top': 30+((currentItem-1)*50)});
        $('.ec-acas-t4-p1-a1-s1-activity-answers').fadeIn();
    });
    
    $('.ec-acas-t4-p1-a1-s1-activity-button-close').click(function () {
        $('.ec-acas-t4-p1-a1-s1-activity-answers').hide();
        $('.ec-acas-t4-p1-a1-s1-activity-open').parent().fadeTo(0, 1);
    });
    
    function setAnswer (e, answer) {
        e.preventDefault();
        var currentLink = $('.ec-acas-t4-p1-a1-s1-activity-open[data-order='+currentItem+']'),
            currentImage = currentLink.find('.ec-ACAS-t4-p1-a1-s1-activity-img');
            
        currentLink.attr('data-answer', answer);
        
        if (answer === 1) {
            currentImage.attr('src', 'images/ec-ACAS-t4-p1-a1-s1-non-intrude.png');
        }
        else if (answer === 2) {
            currentImage.attr('src', 'images/ec-ACAS-t4-p1-a1-s1-proximate.png');
        }
        else if (answer === 3) {
            currentImage.attr('src', 'images/ec-ACAS-t4-p1-a1-s1-intruder.png');
        }
        else if (answer === 4) {
            currentImage.attr('src', 'images/ec-ACAS-t4-p1-a1-s1-threat.png');
        }
        
        checkAnswers();
    }
    
    function checkAnswers () {
        
        if($('.ec-acas-t4-p1-a1-s1-activity-open[data-answer="0"]').length != 0) {
            return false;
        }
        
        // console.log('answer!');
        
        if (
            $('.ec-acas-t4-p1-a1-s1-activity-open[data-order="1"]').attr('data-answer') === '1' && 
            $('.ec-acas-t4-p1-a1-s1-activity-open[data-order="2"]').attr('data-answer') === '2' && 
            $('.ec-acas-t4-p1-a1-s1-activity-open[data-order="3"]').attr('data-answer') === '3' && 
            $('.ec-acas-t4-p1-a1-s1-activity-open[data-order="4"]').attr('data-answer') === '4'
            ) 
        {
            $('.ec-ACAS-t4-p1-a1-s1-correctness').removeClass('ec-ACAS-instructions ec-ACAS-feedback-wrong').addClass('ec-ACAS-feedback-correct').html('That is correct!.');
            $('.ec-ACAS-t4-p1-a1-s1-feedback').show();
            $('.ec-acas-t4-p1-a1-s1-activity-answers').hide();
            $('.ec-acas-t4-p1-a1-s1-activity-open').parent().fadeTo(0, 1);
        }
        else {
            $('.ec-ACAS-t4-p1-a1-s1-correctness').removeClass('ec-ACAS-instructions').addClass('ec-ACAS-feedback-wrong').html('That is wrong, please try again.');
        }
    }
    
    $('.ec-acas-t4-p1-a1-s1-activity-button-1').click(function (e) {
        setAnswer(e, 1);
    });
    
    $('.ec-acas-t4-p1-a1-s1-activity-button-2').click(function (e) {
        setAnswer(e, 2);
    });
    
    $('.ec-acas-t4-p1-a1-s1-activity-button-3').click(function (e) {
        setAnswer(e, 3);
    });
    
    $('.ec-acas-t4-p1-a1-s1-activity-button-4').click(function (e) {
        setAnswer(e, 4);
    });
    
    
    return module;
    
    
})(window.$ = window.$ || null, window.TimelineMax = window.TimelineMax || null, window.ecSvgUtilities = window.ecSvgUtilities || null);