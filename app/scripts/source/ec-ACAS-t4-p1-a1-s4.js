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
    
    $('.ec-ACAS-t4-p1-a1-s4-audio').click(function(){
        console.log('clicked audio!');
    });
    
    // TODO:
    // randomise drags before initializing
    // Allow reset, which will need to reset start position: either startPos or unbind and rebind OR set startPos on shuffle!
    // check if target has a drag already > send current one back to start pos.
    // DONE NEED to remove has drag attribute from target if has no drag when drag is removed.
    // BUT if drop on another target, that stays now!
    // check for all answered and whether correct.
    // Add audio with non drag click or add speaker icon in bottom right?
    // DONE Add instruction text and feedback icons and text.
    // Proof read whole course
    // TEST TEST TEST SVG!!! on LCMS!!!!
    var dragArray = [];
    for (var i = 13; i >= 1; i--) {
        var currentDrag = $('#ec-ACAS-t4-p1-a1-s4-drag-'+i);
        var currentPep = currentDrag.pep({
            useCSSTranslation: false,
            shouldEase: false,
            droppable:   '.ec-ACAS-t4-p1-a1-s4-target',
            initiate: function(ev, obj){
                /*console.log(obj.activeDropRegions.length);
                if(obj.activeDropRegions.length === 1) {
                    console.log('hi', obj.activeDropRegions[0][0]);
                    $(obj.activeDropRegions[0][0]).attr('data-current-drag', '');
                }*/
                // $('#'+obj.$el.attr('data-current-target')).attr('data-current-drag', '');
                
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
    
    
    
    function handleCentering(ev, obj){
        if ( obj.activeDropRegions.length > 0 ) {
            // console.log(obj.activeDropRegions);
            obj.$el.addClass('ec-ACAS-t4-p1-a1-s4-drag-dropped');
            centerWithin(ev, obj);
        }   
    }
    
    function centerWithin(ev, obj){
        var $parent = obj.activeDropRegions[0];
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
        
        obj.$el.attr('data-current-target', $parent.attr('id'));
        
        $('.ec-ACAS-t4-p1-a1-s4-drag').each(function () {
            // $(this).attr('data-current-target')
            var self = $(this);
            if (self.attr('data-current-target') === obj.$el.attr('data-current-target') && self.attr('id') != obj.$el.attr('id')) {
                // console.log('gotta live one!', obj.$el.attr('id'));
                self.removeClass('ec-ACAS-t4-p1-a1-s4-drag-dropped');
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
    
    // Reset position to absolute after pep.js sets parent to relative.
    $('.ec-ACAS-t4-p1-a1-s4-window').css({'position': 'absolute'});
    
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