var ec_ACAS_Pages = (function($)
{
    'use strict';
    
    var module = {};
    
    module.hideObject = {
                            'position': 'absolute !important',
                            'height': '1px',
                            'width': '1px', 
                            'overflow': 'hidden',
                            'clip': 'rect(1px, 1px, 1px, 1px)'
                        };
    
    module.showObject = {
                            'position': 'relative !important',
                            'height': 'auto',
                            'width': '520px', 
                            'overflow': 'auto',
                            'clip': 'auto'
                        };
    
    module.initSlides = function (slideControls, slides) {
        // use data attribute on page x of x...
        var slideControls = $(slideControls),
            slides = slides,
            prevLink = slideControls.find('.ec-acas-slides-previous'),
            nextLink = slideControls.find('.ec-acas-slides-next'),
            TOTAL_SLIDES = slides.length;
        
        function slidesNextPrevious (direction) {
            var xOfx = slideControls.find('.ec-ACAS-slides-x-of-x'),
            currentSlide = parseInt(xOfx.text(), 10) + direction;
            nextPreviousVisible (currentSlide)
            xOfx.html(currentSlide);
            // substring due to bad implementation previously
            module.showHideClasses ([slides[currentSlide-1]], slides);
        }
        
        function nextPreviousVisible (currentSlide) {
            currentSlide > 1 ? prevLink.show() : prevLink.hide();
            currentSlide < TOTAL_SLIDES ? nextLink.show() : nextLink.hide();
        }
        
        prevLink.click(function (event) {
            event.preventDefault();
            slidesNextPrevious (-1);
            // pagesScript.showHideClasses (['ec-ACAS-page-1-slide-'+currentSlide], ['ec-ACAS-slide']);
        });
        
        nextLink.click(function (event) {
            event.preventDefault();
            slidesNextPrevious (1);
            // pagesScript.showHideClasses (['ec-ACAS-page-1-slide-'+currentSlide], ['ec-ACAS-slide']);
        });
        
        // hide previous link on start up.
        nextPreviousVisible (1, TOTAL_SLIDES);
    };
    
    
    
    
    /**
     * Hide divs that contain matching class names
     * @param  {array} _classesToHide an array of class names whose containers will be hidden
     * @return none
     */
    module.hideClasses = function (_classesToHide) {

        for (var i = _classesToHide.length - 1; i >= 0; i--) {
            // class dot allows class names with or without dot
            var className = _classesToHide[i];
            var classDot = className.substring(0, 1) === '.' ? '' : '.';
            $(classDot + _classesToHide[i]).addClass('ec-acas-hide');
            // $('.'+_classesToHide[i]).addClass('ec-acas-hide');
            // $('.'+_classesToHide[i]).css(module.hideObject);
            // $('.'+_classesToHide[i]).hide();
            // $('.'+_classesToHide[i]).css({'opacity': 0, 'z-index':0});
        }

    };
    
    /**
     * Shoe containers with the first class name and hide the classes in the second parameter array
     * @param  {[array]} _classesToShow an array of class names whose containers will be shown
     * @param  {[array]} _classesToHide an array of class names whose containers will be hidden
     * @return none
     */
    module.showHideClasses = function (_classesToShow, _classesToHide) {
        
        module.hideClasses(_classesToHide);
        
        for (var i = _classesToShow.length - 1; i >= 0; i--) {
            // class dot allows class names with or without dot
            var className = _classesToShow[i];
            var classDot = className.substring(0, 1) === '.' ? '' : '.';
            $(classDot + _classesToShow[i]).removeClass('ec-acas-hide');
            // $('.'+_classesToHide[i]).css(module.showObject);
            // $('.'+_classesToShow[i]).show();
            // $('.'+_classesToShow[i]).css({'opacity': 1, 'z-index':1});
        }
        
    };

    return module;
    
}($));