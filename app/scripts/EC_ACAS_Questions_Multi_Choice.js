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
    
    module.createDropdownQuestion = function (_parent, _config) {
        var selectOptions = _config.selectOptions || [],
            placeholder = _config.placeholder || 'Please select',
            dropDown = $('<select></select>');
            
            selectOptions.shuffle();
            dropDown.appendTo(_parent);
            
            var tickCrossCSS = {
                'position': 'absolute',
                'height': dropDown.height().toString() + 'px',
                'width': dropDown.height().toString() + 'px',
                'right': '1px',
                'top': '-1px',
                'display': 'none',
                'background': '#fff'
            }
            
            
            var crossImage = $('<img />', {src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDMvMDkvMTU7THe5AAAAs0lEQVQ4jeWTTRGEMAyFn4RKQAoSKgEJSIgEJFTCSkACEpBQB28v2ZnQTVuY4cKQmZzSfHn5KfBOIxAIpLtgKwESiJVCMwEhEHqgSUEksBaxSCCb+NYEakUaH50iP8+eegsbnITRAUmzRQNcnGTr0ymQAW63gBQWimGTwH4ZpLC5oix1T6IAeZs7KOy2q5v8OMmxMsPs/pRGW6LxYH7G3x16wFTOp1J0V1XdVkUVSPPh4+wLUfrXZaRzOuAAAAAASUVORK5CYII='}).appendTo(_parent);
            crossImage.css(tickCrossCSS);
            
            var tickImage = $('<img />', {src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDMvMDkvMTU7THe5AAABAUlEQVQ4jc3TsVUCQRDG8R9KLh0omSF2QGSqViB0oO9tLuQXUAIlQGqiViB2cCVgBwa791jwDjxI/LKdmf3vfLuz/DsVrqBzIqSHOe7Q754AGmKBC4wF5dmRoBHe0upBMOcYm4U5HjPQokq162wbNM5B7WDboGllLdffbBYmeEmrpeC+ruxwZ/GyK9AXRk2lnbShl4rWW+0XBvjM6m8EqyZYN214F+clgoNZOiC/4Od9IKLN4U5skkAzXKbYh2C2D8TG5tBmCGEpfpFKfUF5CHYOXpVu9TFI8eusZro7T03KX3NSk//msL3fsGhjuZN/Eqzbw6LyLmqnvJ0Kq/QgrfUDOX85tvBi/64AAAAASUVORK5CYII='}).appendTo(_parent);
            tickImage.css(tickCrossCSS);
            
            var currentOption = $('<option />', {value: -1, text: placeholder}).appendTo(dropDown);
            // console.log(currentOption);
            currentOption.attr('data-correctness', 'none');
            
            for (var i = selectOptions.length - 1; i >= 0; i--) {
                var labelText = selectOptions[i].labelText;
                currentOption = $('<option  />', {value: i, text: labelText}).appendTo(dropDown);
                currentOption.attr('data-correctness', selectOptions[i].correctness);
            };
            
            
            
            dropDown.change(function (e) {
                crossImage.hide();
                tickImage.hide();
                var selected = $(this).find( 'option:selected' );
                if(selected.attr('data-correctness') === 'false') {
                    crossImage.show().delay(1000).fadeOut();
                }
                else if(selected.attr('data-correctness') === 'true') {
                    tickImage.show();
                }
 
// <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDMvMDkvMTU7THe5AAABAUlEQVQ4jc3TsVUCQRDG8R9KLh0omSF2QGSqViB0oO9tLuQXUAIlQGqiViB2cCVgBwa791jwDjxI/LKdmf3vfLuz/DsVrqBzIqSHOe7Q754AGmKBC4wF5dmRoBHe0upBMOcYm4U5HjPQokq162wbNM5B7WDboGllLdffbBYmeEmrpeC+ruxwZ/GyK9AXRk2lnbShl4rWW+0XBvjM6m8EqyZYN214F+clgoNZOiC/4Od9IKLN4U5skkAzXKbYh2C2D8TG5tBmCGEpfpFKfUF5CHYOXpVu9TFI8eusZro7T03KX3NSk//msL3fsGhjuZN/Eqzbw6LyLmqnvJ0Kq/QgrfUDOX85tvBi/64AAAAASUVORK5CYII="/>




            });
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