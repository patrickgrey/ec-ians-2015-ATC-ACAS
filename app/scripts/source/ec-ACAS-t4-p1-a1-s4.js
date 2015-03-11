;var ec_ACAS_t4_p1_a1_s4 = (function ($) {
    
    'use strict';
    
    // Add checking for $ and GSAP with console feedback.
    if($ === null) {
        console.log('jQuery is required to animate the SVG. Please ensure you are loading both libraries. Have a nice day :-)');
        return;
    }
    
    var module = {},
        audioDictionary = {},
        audioPath = 'audio',
        audioArray = [
                        't4p1a0LevelOff', 
                        't4p1a1Traffic', 
                        't4p1a2Monitor_Vertical_Speed', 
                        't4p1a3Descend', 
                        't4p1a4Climb', 
                        't4p1a5Increase_Descent', 
                        't4p1a6Increase_Climb', 
                        't4p1a7Adjust_Vertical_Speed', 
                        't4p1a8Descend_Now', 
                        't4p1a9Climb_Now', 
                        't4p1a10Crossing_Descend', 
                        't4p1a11Crossing_Climb', 
                        't4p1a12Maintain_Vertical_Speed', 
                        't4p1a13Maintain_Crossing_Maintain', 
                        't4p1a14Adjust_Vertical_Speed', 
                        't4p1a15Clear_of_Conflict'
                    ];
    
    ecSvgUtilities.createAudio(audioArray, audioPath, audioDictionary);
    
    $('.ec-ACAS-t4-p1-a1-s4-launch').click(function(){
        $('.ec-ACAS-t4-p1-a1-s4-window').show();
    });
    
    $('.ec-ACAS-t4-p1-a1-s4-window-close').click(function(){
        $('.ec-ACAS-t4-p1-a1-s4-window').hide();
    });
    
    $('.ec-ACAS-t4-p1-a1-s4-audio').click(function(e){
        
        switch($(e.target).attr('id')) {
            case 'ec-ACAS-t4-p1-a1-s4-audio-1':
                ecSvgUtilities.callAudio('t4p1a1Traffic'); break;
            case 'ec-ACAS-t4-p1-a1-s4-audio-2':
                ecSvgUtilities.callAudio('t4p1a7Adjust_Vertical_Speed'); break;
            case 'ec-ACAS-t4-p1-a1-s4-audio-3':
                ecSvgUtilities.callAudio('t4p1a0LevelOff'); break;
            case 'ec-ACAS-t4-p1-a1-s4-audio-4':
                ecSvgUtilities.callAudio('t4p1a2Monitor_Vertical_Speed'); break;
            case 'ec-ACAS-t4-p1-a1-s4-audio-5':
                ecSvgUtilities.callAudio('t4p1a12Maintain_Vertical_Speed'); break;
            case 'ec-ACAS-t4-p1-a1-s4-audio-6':
                ecSvgUtilities.callAudio('t4p1a4Climb'); break;
            case 'ec-ACAS-t4-p1-a1-s4-audio-7':
                ecSvgUtilities.callAudio('t4p1a6Increase_Climb'); break;
            case 'ec-ACAS-t4-p1-a1-s4-audio-8':
                ecSvgUtilities.callAudio('t4p1a9Climb_Now'); break;
            case 'ec-ACAS-t4-p1-a1-s4-audio-9':
                ecSvgUtilities.callAudio('t4p1a3Descend'); break;
            case 'ec-ACAS-t4-p1-a1-s4-audio-10':
                ecSvgUtilities.callAudio('t4p1a5Increase_Descent'); break;
            case 'ec-ACAS-t4-p1-a1-s4-audio-11':
                ecSvgUtilities.callAudio('t4p1a8Descend_Now'); break;
            case 'ec-ACAS-t4-p1-a1-s4-audio-12':
                ecSvgUtilities.callAudio('t4p1a14Adjust_Vertical_Speed'); break;
            case 'ec-ACAS-t4-p1-a1-s4-audio-13':
                ecSvgUtilities.callAudio('t4p1a15Clear_of_Conflict'); break;
        }
        
    });
    
    $('.ec-ACAS-t4-p1-a1-s4-button-replay').click(function(){
        $(this).hide();
        for (var i = dragArray.length - 1; i >= 0; i--) {
            var currentDrag = dragArray[i];
            currentDrag.removeClass('ec-ACAS-t4-p1-a1-s4-drag-dropped');
            currentDrag.attr('data-current-target', '');
            currentDrag.css({'left': currentDrag.attr('data-current-initial-left'), 'top': currentDrag.attr('data-current-initial-top')});
            currentDrag.find('.ec-ACAS-t4-p1-a1-s4-tick').hide();
            currentDrag.find('.ec-ACAS-t4-p1-a1-s4-cross').hide();
            $.pep.unbind(currentDrag);
        }
        initDrags();
        // $.pep.unbind($('.ec-ACAS-t4-p1-a1-s4-drag'));
        randomizePositions();
    });
    
    // TODO:
    // DONErandomise drags before initializing
    // Allow reset, which will need to reset start position: either startPos or unbind and rebind OR set startPos on shuffle!
    // DONEcheck if target has a drag already > send current one back to start pos.
    // DONE NEED to remove has drag attribute from target if has no drag when drag is removed.
    // DONEBUT if drop on another target, that stays now!
    // check for all answered and whether correct.
    // Add audio with non drag click or add speaker icon in bottom right?
    // DONE Add instruction text and feedback icons and text.
    // Proof read whole course
    // TEST TEST TEST SVG!!! on LCMS!!!!
    var dragArray = [];
    
    function initDrags () {
        
        for (var i = 13; i >= 1; i--) {
            var currentDrag = $('#ec-ACAS-t4-p1-a1-s4-drag-'+i);
            currentDrag.attr('data-correct-target', 'ec-ACAS-t4-p1-a1-s4-target-'+i);
            var currentPep = currentDrag.pep({
                useCSSTranslation: false,
                shouldEase: false,
                droppable:   '.ec-ACAS-t4-p1-a1-s4-target',
                initiate: function(ev, obj){
                    obj.$el.removeClass('ec-ACAS-t4-p1-a1-s4-drag-dropped');
                    $('.ec-ACAS-t4-p1-a1-s4-drag').css('z-index', '50');
                    obj.$el.css('z-index', '51');
                    $('.ec-ACAS-t4-p1-a1-s4-instructions').fadeOut();
                },
                start: function(ev, obj){
                    obj.noCenter = false;
                    // obj.$el.removeClass('ec-ACAS-t4-p1-a1-s4-drag-dropped');
                },
                stop: function(ev, obj){
                    handleCentering(ev, obj);
                },
                rest: handleCentering,
                revert: true,
                revertIf: function(){
                    return !this.activeDropRegions.length;
                },
                constrainTo: 'parent'
            });
            
            // console.log(currentPep.__proto__);
            // console.log(currentDrag.pep);
            
            dragArray.push(currentDrag);
        }
        
        // Reset position to absolute after pep.js sets parent to relative.
        $('.ec-ACAS-t4-p1-a1-s4-window').css({'position': 'absolute'});
        
    }
    
    initDrags ();
    
    function checkAllDropped (obj) {
        // console.log('hi');
        var allDropped = true;
        $('.ec-ACAS-t4-p1-a1-s4-drag').each(function () {
            var self = $(this);
            self.find('.ec-ACAS-t4-p1-a1-s4-tick').hide();
            self.find('.ec-ACAS-t4-p1-a1-s4-cross').hide();
            if (!self.attr('data-current-target') || self.attr('data-current-target') === '') {
                allDropped = false;
            }
        });
        // console.log(allDropped);
        if (allDropped) {
            checkAnswers();
        }
        else {
            $('.ec-ACAS-t4-p1-a1-s4-note').hide();
        }
    }
    
    function checkAnswers () {
        
        var allCorrect = true;
        
        $('.ec-ACAS-t4-p1-a1-s4-drag').each(function () {
            var self = $(this);
            if ( self.attr('data-correct-target') === self.attr('data-current-target') ) {
                self.find('.ec-ACAS-t4-p1-a1-s4-tick').show();
            }
            else {
                self.find('.ec-ACAS-t4-p1-a1-s4-cross').show();
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            $('.ec-ACAS-t4-p1-a1-s4-note').fadeIn();
            $('.ec-ACAS-t4-p1-a1-s4-button-replay').fadeIn();
        }
        else {
            $('.ec-ACAS-t4-p1-a1-s4-note').hide();
        }
    }
    
    function handleCentering(ev, obj){
        if ( obj.activeDropRegions.length > 0 ) {
            // console.log(obj.activeDropRegions);
            obj.$el.addClass('ec-ACAS-t4-p1-a1-s4-drag-dropped');
            centerWithin(ev, obj);
        }
        else{
            obj.$el.attr('data-current-target', '');
        }
        checkAllDropped (obj);
    }
    
    function centerWithin(ev, obj){
        var $parent = obj.activeDropRegions[0];
        // get the parent that is closest to the mouse cursor as there may be more than one.
        for (var i = obj.activeDropRegions.length - 1; i >= 0; i--) {
            
            var boundingRect = obj.activeDropRegions[i][0].getBoundingClientRect();
            
            if (
                    ev.pageX >= boundingRect.left &&
                    ev.pageX <= boundingRect.right &&
                    ev.pageY >= boundingRect.top &&
                    ev.pageY <= boundingRect.bottom
                )
            {
                $parent = obj.activeDropRegions[i];
            }
        };
        
        // Record which target the drag has landed on
        obj.$el.attr('data-current-target', $parent.attr('id'));
        // Reset any other drags with the same target and check if all dropped.
        $('.ec-ACAS-t4-p1-a1-s4-drag').each(function () {
            var self = $(this);
            if (self.attr('data-current-target') === obj.$el.attr('data-current-target') && self.attr('id') != obj.$el.attr('id')) {
                self.removeClass('ec-ACAS-t4-p1-a1-s4-drag-dropped');
                self.attr('data-current-target', '');
                self.css({'left': self.attr('data-current-initial-left'), 'top': self.attr('data-current-initial-top')});
            }
        });
        
        
        
        var pTop    = $parent.offset().top;
        var pLeft   = $parent.offset().left;
        var pHeight = $parent.outerHeight();
        var pWidth  = $parent.outerWidth();
        var oTop    = obj.$el.offset().top;
        var oLeft   = obj.$el.offset().left;
        var oHeight = obj.$el.outerHeight();
        var oWidth  = obj.$el.outerWidth();
        var cTop    = pTop + (pHeight/2);
        var cLeft   = pLeft + (pWidth/2);
        if ( !obj.noCenter ) {
            if ( !obj.shouldUseCSSTranslation() ) {
                // var moveTop = cTop - (oHeight/2);
                var moveTop = cTop + 11;
                var moveLeft = cLeft - (oWidth/2) - 6;
                obj.$el.animate({ top: moveTop, left: moveLeft }, 50);
            } else{
                var moveTop   = (cTop - oTop) - oHeight/2;
                var moveLeft  = (cLeft - oLeft) - oWidth/2;
                console.log(oTop, oLeft)
                obj.moveToUsingTransforms( moveTop, moveLeft );
            }
            obj.noCenter = true;
            return;
        }
        obj.noCenter = false;
    }
    
    
    
    // set new positions and reset pep start properties
    function randomizePositions () {
        // var currentDrag,
        //     tempPosition = {'left':'0', 'top': '0'},
        //     newPosition = {'left':'0', 'top': '0'},
        //     randomDrag;
            
        for (var i = dragArray.length - 1; i >= 0; i--) {
            var currentDrag = dragArray[i],
                tempPosition = {'left':'0', 'top': '0'},
                newPosition = {'left':'0', 'top': '0'},
                randomDrag;
            // console.log('currentDrag: ', currentDrag.attr('id'));
            tempPosition.left = currentDrag.css('left');
            tempPosition.top = currentDrag.css('top');
            // console.log('tempPosition.left: ', tempPosition.left);
            // console.log('tempPosition.top: ', tempPosition.top);
            var randomNumber = Math.floor(Math.random() * (13 - 1) + 1);
            // console.log('randomNumber: ', randomNumber);
            randomDrag = dragArray[randomNumber];
            // console.log('randomDrag: ', randomDrag);
            newPosition.left = randomDrag.css('left');
            newPosition.top = randomDrag.css('top');
            // console.log('newPosition.left: ', newPosition.left);
            // console.log('newPosition.top: ', newPosition.top);
            currentDrag.css({'left': newPosition.left, 'top': newPosition.top});
            randomDrag.css({'left': tempPosition.left, 'top': tempPosition.top});
            // currentDrag.attr('data-current-initial-left', randomDrag.css('left'));
            // currentDrag.attr('data-current-initial-top', randomDrag.css('top'));
            
            // if (currentDrag === randomDrag) {console.log('match!');};
            // console.log('currentDrag.css left: ', currentDrag.css('left'));
            // console.log('currentDrag.css top: ', currentDrag.css('top'));
            // console.log('randomDrag.css left: ', randomDrag.css('left'));
            // console.log('************************');
            // currentDrag.pep.startPos = { left: newPosition.left, top: newPosition.top };
        };
        // second loop required or values get overwritten for a reason I'm still not clear on.
        for (var i = dragArray.length - 1; i >= 0; i--) {
            var currentDrag = dragArray[i];
            currentDrag.attr('data-current-initial-left', currentDrag.css('left'));
            currentDrag.attr('data-current-initial-top', currentDrag.css('top'));
        };
    }
    
    randomizePositions ();
    
    return module;
    
    
})(window.$ = window.$ || null);