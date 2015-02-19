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
    
    /**
     * Hide divs that contain matching class names
     * @param  {array} _classesToHide an array of class names whose containers will be hidden
     * @return none
     */
    module.hideClasses = function (_classesToHide) {

        for (var i = _classesToHide.length - 1; i >= 0; i--) {
            $('.'+_classesToHide[i]).addClass('ec-acas-hide');
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
            $('.'+_classesToShow[i]).removeClass('ec-acas-hide');
            // $('.'+_classesToHide[i]).css(module.showObject);
            // $('.'+_classesToShow[i]).show();
            // $('.'+_classesToShow[i]).css({'opacity': 1, 'z-index':1});
        }
        
    };

    return module;
    
}($));