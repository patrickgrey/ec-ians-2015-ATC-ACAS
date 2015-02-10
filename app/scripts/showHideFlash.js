var ec_ACAS_ShowHideFlash = (function($)
{
    'use strict';
    
    var module = {};
    var pagesScript = ec_ACAS_Pages || {};
    
    /**
     * Initialise links so they show and hide flash containers
     * @param  {string} _elementID   [the id of the link]
     * @param  {array} _showClasses [an array of classes that should be shown]
     * @param  {array} _hideClasses [an array of classes that should be hidden]
     * @return none
     */
    module.init = function (_elementID, _showClasses, _hideClasses) {
            var el = $('#'+_elementID);
            var showClasses = _showClasses;
            var hideClasses = _hideClasses;
            var handleClick = function (event) {
                event.preventDefault();
                pagesScript.showHideClasses (showClasses, hideClasses);
            };
            el.click(handleClick);
    };

    return module;
    
}($));