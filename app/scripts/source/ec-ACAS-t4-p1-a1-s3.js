;var ec_ACAS_t4_p1_a1_s3 = (function ($, MultiChoice) {
    
    'use strict';
    
    // Add checking for $ and GSAP with console feedback.
    if($ === null || MultiChoice === null) {
        console.log('jQuery and the custom EC_ACAS_Questions_Multi_Choice script are required to animate the SVG. Please ensure you are loading both libraries. Have a nice day :-)');
        return;
    }
    
    var module = {},
        
        t4p1a1s3q1Feedback = 'We don\'t know, remember that TCAS displays do not show the headings of targets, but their relative position in relation to own aircraft.',
        
        t4p1a1s3q1Question = [
            {
                'question': 'In the example shown, is the intruder aircraft marked in yellow heading towards own aicraft?',
                'choices':  [
                                {'text':'We don\'t know.', 'correctness':'true', 'feedback':'Correct! '+t4p1a1s3q1Feedback},
                                {'text':'Yes.', 'correctness':'false', 'feedback':'Wrong! ' + t4p1a1s3q1Feedback}
                            ]
            }
        ];
    
    EC_ACAS_Questions_Multi_Choice.createQuestion('.ec-ACAS-t4-p1-a1-s3-question-1', t4p1a1s3q1Question);
    
    var t4p1a1s3q2Feedback = 'The required rate of climb is between 2,000 and 2,500 ft/min.',
        
        t4p1a1s3q2Question = [
            {
                'question': 'The required rate of climb is:',
                'choices':  [
                                {'text':'2,000 - 2,500 ft/min.', 'correctness':'true', 'feedback':'Correct! '+t4p1a1s3q2Feedback},
                                {'text':'more than 2,000 ft/min.', 'correctness':'false', 'feedback':'Wrong! ' + t4p1a1s3q2Feedback}
                            ]
            }
        ];
    
    EC_ACAS_Questions_Multi_Choice.createQuestion('.ec-ACAS-t4-p1-a1-s3-question-2', t4p1a1s3q2Question);
    
    $('.ec-ACAS-t4-p1-a1-s3-show-question-1').click(function(){
        $('.ec-ACAS-t4-p1-a1-s3-question-1').show();
        $('.ec-ACAS-t4-p1-a1-s3-question-2').hide();
    });
    
    $('.ec-ACAS-t4-p1-a1-s3-show-question-2').click(function(){
        $('.ec-ACAS-t4-p1-a1-s3-question-2').show();
        $('.ec-ACAS-t4-p1-a1-s3-question-1').hide();
    });
    
    // $('.ec-ACAS-t4-p1-a1-s2-question .ec-acas-question-feedback').css({'margin-top':'15px'});
    // $('.ec-ACAS-t4-p1-a1-s2-question .ec-acas-question-text').css({'margin-bottom':'15px'});
    // $('.ec-ACAS-t4-p1-a1-s2-question .ec-acas-question-item').css({'display':'inline', 'margin-right':'10px'});
    
    
    
    return module;
    
    
})(window.$ = window.$ || null, window.EC_ACAS_Questions_Multi_Choice = window.EC_ACAS_Questions_Multi_Choice || null);