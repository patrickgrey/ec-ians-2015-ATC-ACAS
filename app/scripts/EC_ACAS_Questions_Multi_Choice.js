;var EC_ACAS_Questions_Multi_Choice = (function($)
{
    'use strict';
    
    var module = {};
        
    /*
     * http://sroucheray.org/blog/2009/11/array-sort-should-not-be-used-to-shuffle-an-array/
     * Add a shuffle function to Array object prototype
     * Usage : 
     *  var tmpArray = ["a", "b", "c", "d", "e"];
     *  tmpArray.shuffle();
     */
    Array.prototype.shuffle = function (){
        var i = this.length, j, temp;
        if ( i == 0 ) return;
        while ( --i ) {
            j = Math.floor( Math.random() * ( i + 1 ) );
            temp = this[i];
            this[i] = this[j];
            this[j] = temp;
        }
    };
    
    module.createQuestion = function (_parentElement, _data, _maxFeedbackHeight) {
        
        var questionData = _data || [];
        var parentElementWithoutDot = _parentElement.substr(1);
                
        // Create a container for all questions
        var allContainer = $(document.createElement('div'));
        allContainer.addClass('ec-acas-question-container-all').appendTo($(_parentElement));
        
        for (var i = questionData.length - 1; i >= 0; i--) {
            // Create container for current question
            var container = $(document.createElement('div'));
            container.addClass(parentElementWithoutDot+'-container-'+i.toString()).appendTo(allContainer);
            
            // Create the question element
            $(document.createElement('div')).addClass('ec-acas-question-text '+parentElementWithoutDot+'-question-'+i.toString())
            .html(questionData[i].question)
            .appendTo(container)
            .css({
                background: '#D5EAF4',
                padding: '10px',
                'border-radius': '5px'
            });
            
            // Create all the choice elements
            // Randomise first
            var choices = questionData[i].choices;
            choices.shuffle();
            
            
            for (var j = choices.length - 1; j >= 0; j--) {
                var label = $(document.createElement('label'));
                // console.log('ec-acas-question-item '+parentElementWithoutDot+'-item-'+j.toString())
                label.addClass('ec-acas-question-item '+parentElementWithoutDot+'-item-'+j.toString())
                .html(choices[j].text)
                .appendTo(container)
                .css({
                    display: 'block',
                    background: '#ff9',
                    'margin-top': '10px',
                    padding: '10px',
                    'border-radius': '5px',
                    border: '1px solid #eee',
                    cursor: 'pointer'
                });
                var radio = $( '<input type="radio" value="'+choices[j].correctness+'" data-question="'+i+'" data-choice="'+j+'" data-parent="'+parentElementWithoutDot+'" name='+ parentElementWithoutDot+'-item-radio' +' />' )
                radio.addClass('ec-acas-question-radio '+parentElementWithoutDot+'-item-radio-'+i.toString())
                .prependTo(label)
                .css({
                    'margin-right': '10px'
                })
                .change(function () {
                    // module.radioSelected($(this).attr('name'));
                    var feedback = $('.'+$(this).attr('data-parent')+'-feedback');
                    var isCorrect = false;
                    $('input[name="'+$(this).attr('name')+'"]').each(function () {
                        // Show correctness by changing choice background (should have tick / cross as well for colour blindness?)
                        // Ticks and crosses can be difficult getting correct escape codes. Feedback will have correct or wrong so should suffice.
                        $(this).parent().css({'background': $(this).val() === 'true' ? '#efc' : '#fcc'});
                        // Change feedback background if required, input correct text and show.
                        if ($(this).is(':checked')) {
                            if ( $(this).val() === 'true' ) {
                                isCorrect = true;
                            }
                            // How to get the correct feedback? data-choice = iteration number?
                            feedback.html(questionData[$(this).attr('data-question')].choices[$(this).attr('data-choice')].feedback);
                        }
                    });
                    
                    feedback.css({'background': isCorrect ? '#efc' : '#fcc'});
                    if (_maxFeedbackHeight) {
                        feedback.css({'max-height': _maxFeedbackHeight+'px', 'overflow-y': 'auto'});
                    }
                    
                    feedback.show();
                });
            };
            
            // Create the feedback container with correct background as default and hide
            $(document.createElement('div')).addClass('ec-acas-question-feedback '+parentElementWithoutDot+'-feedback')
            // .html(choices[0].feedback)
            .appendTo(container)
            .css({
                'display': 'none',
                background: '#efc',
                'margin-top': '10px',
                padding: '10px',
                'border-radius': '5px',
                border: '1px solid #eee'
            });
        };
    };
    
    // module.radioSelected = function (radioGroupName) {
    //     var feedback = $('.'+$(this).attr('data-parent')+'-feedback');
    //     console.log($(this).attr('data-parent'));
    //     var isCorrect = false;
    //     $('input[name="'+radioGroupName+'"]').each(function () {
    //         // Show correctness by changing choice background (should have tick / cross as well for colour blindness?)
    //         // Ticks and crosses can be difficult getting correct escape codes. Feedback will have correct or wrong so should suffice.
    //         $(this).parent().css({'background': $(this).val() === 'true' ? '#efc' : '#fcc'});
    //         // Change feedback background if required, input correct text and show.
    //         if ($(this).is(':checked')) {
    //             if ( $(this).val() === 'true' ) {
    //                 isCorrect = true;
    //             }
    //             // How to get the correct feedback? data-choice = iteration number?
    //             feedback.html(questionData[$(this).attr('data-question')].choices[$(this).attr('data-choice')].feedback);
    //         }
    //     });
        
    //     feedback.css({'background': isCorrect ? '#efc' : '#fcc'});
        
    //     feedback.show();
    // };
    
    return module;
    
}($));