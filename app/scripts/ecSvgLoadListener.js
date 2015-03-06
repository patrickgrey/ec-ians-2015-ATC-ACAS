/**
 * There seems to be a race condition between the document
 * and the Object document svg content.
 * @param  {[object]} Object element into which svg is loaded.
 * @return {[function]} The callback function to be called when the svg is loaded.
 */
var ecSvgLoadListener = (function () {
    
    'use strict';
    
    var module = {};
    
    module.addSVGListener = function (svgObject, callback, callbackConfig) {
        
        var callbackConfig = callbackConfig || {},
            svgObject = svgObject,
            callback = callback,
            callbackConfig = callbackConfig;
        
        
        // There seems to be a race condition between the document
        // and the Object document svg content.
        // MAYBE THIS SHOULD BE A TRY CATCH!!!
        try {
            svgObject.getSVGDocument();
            callback(callbackConfig);
        }
        catch (e) {
            svgObject.addEventListener('load', function svgObjectLoad(event){
                // console.log('loaded');
                svgObject.removeEventListener('load', svgObjectLoad, false); //remove listener, no longer needed
                callback(callbackConfig);
            },false);
        }
        
    };
    
    return module;
    
})();