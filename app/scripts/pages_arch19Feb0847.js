var ec_ACAS_Pages = (function($)
{
    'use strict';
    
    var module = {};
    
    /**
     * Hide divs that contain matching class names
     * @param  {array} _classesToHide an array of class names whose containers will be hidden
     * @return none
     */
    module.hideClasses = function (_classesToHide) {

        for (var i = _classesToHide.length - 1; i >= 0; i--) {
            $('.'+_classesToHide[i]).hide();
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
            $('.'+_classesToShow[i]).show();
            // $('.'+_classesToShow[i]).css({'opacity': 1, 'z-index':1});
        }
        
    };

    return module;
    
}($));