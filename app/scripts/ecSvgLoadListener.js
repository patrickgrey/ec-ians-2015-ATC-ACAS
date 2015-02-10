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
        
        var callbackConfig = callbackConfig || {};
        
        // There seems to be a race condition between the document
        // and the Object document svg content.
        if(svgObject.getSVGDocument()) {
            callback(callbackConfig);
        }
        else {
            svgObject.addEventListener("load", function svgObjectLoad(event){
                svgObject.removeEventListener("load", svgObjectLoad, false); //remove listener, no longer needed
                callback(callbackConfig);
            },false);
        }
        
    };
    
    return module;
    
})();