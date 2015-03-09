;var ec_ACAS_t4_p1_a1_s1 = (function ($, MultiChoice) {
    
    'use strict';
    
    // Add checking for $ and GSAP with console feedback.
    if($ === null || MultiChoice === null) {
        console.log('jQuery and the custom EC_ACAS_Questions_Multi_Choice script are required to animate the SVG. Please ensure you are loading both libraries. Have a nice day :-)');
        return;
    }
    
    var module = {},
        
        t4p1a1s2Feedback = 'We don\'t know. It might be, but if it is, then it is doing do at less than 500 ft/min.',
        
        t4p1a1s2Question = [
            {
                'question': 'Do we know if the aircraft represented by the non-intruding traffic symbol highlighted in grey is climbing or descending?',
                'choices':  [
                                {'text':'No.', 'correctness':'true', 'feedback':'Correct! '+t4p1a1s2Feedback},
                                {'text':'Yes.', 'correctness':'false', 'feedback':'Wrong! ' + t4p1a1s2Feedback}
                            ]
            }
        ];
    
    EC_ACAS_Questions_Multi_Choice.createQuestion('.ec-ACAS-t4-p1-a1-s2-question', t4p1a1s2Question);
    
    $('.ec-ACAS-t4-p1-a1-s2-question .ec-acas-question-feedback').css({'margin-top':'15px'});
    $('.ec-ACAS-t4-p1-a1-s2-question .ec-acas-question-text').css({'margin-bottom':'15px'});
    $('.ec-ACAS-t4-p1-a1-s2-question .ec-acas-question-item').css({'display':'inline', 'margin-right':'10px'});
    
    
    var q1Config = {
        'selectOptions': [{'labelText':'above', 'correctness': 'true'}, {'labelText':'below', 'correctness': 'false'}], 
        'placeholder': '---?---'
    };
    
    EC_ACAS_Questions_Multi_Choice.createDropdownQuestion($('.ec-acas-t4-p1-a1-s2-dropdown-question-1'), q1Config);
    
    var q2Config = {
        'selectOptions': [{'labelText':'above', 'correctness': 'false'}, {'labelText':'below', 'correctness': 'true'}], 
        'placeholder': '---?---'
    };
    
    EC_ACAS_Questions_Multi_Choice.createDropdownQuestion($('.ec-acas-t4-p1-a1-s2-dropdown-question-2'), q2Config);
    // 
    
    
    return module;
    
    
})(window.$ = window.$ || null, window.EC_ACAS_Questions_Multi_Choice = window.EC_ACAS_Questions_Multi_Choice || null);