/**
 * This is a simple set of utility functions to facilitate SVG animations.
 *     - callAudio: simple call put in function as future implementation
 *     may need more complicated calls.
 *     - createAudio: create dynamic audio elements.
 *     - getSVGElementsWithID: put all SVG elements with an ID attribute
 *     into a dictionary object.
 */

;var ecSvgUtilities = (function () {
    
    'use strict';
    
    var module = {};
    
    /*------------------------------------*\
     #UTILITY FUNCTIONS
    \*------------------------------------*/
    
    /**
     * Play dynamic HTML5 audio element. Put into a function
     * in case more checking is required later or other file types introduced.
     * @param  {[string]} audioName [name of media file to play]
     */
    module.callAudio = function (audioName) {
        // all[audioName].play();
        var audio = document.getElementById(audioName);
        audio.play();
    };
    
    /**
     * AUDIO tags can be included in SVG but
     * I decided to keep all audio work in JavaScript as the graphics should be maniputlated
     * by designers and not need to reinsert the audio code each time.
     * I could add AUDIO tags to the page declaritively but
     * I think it is neater to have it all here.
     */
    module.createAudio = function (audioArray, audioPath, all) {
        var audio;
        for (var i = 0; i < audioArray.length; i++) {
            var id = audioArray[i];
            
            if (!document.getElementById(id)) {
                audio = document.createElement("audio");
                audio.setAttribute("id", id);
                // $(audio).attr('controls','');
                audio.src = audioPath + '/' + audioArray[i] + '.mp3';
                document.body.appendChild(audio);
                all[id] = audio;
            }
        };
    };
    
    /**
     * Creates a lookup dictionary with ID as key and element as value
     * @param  {[object]} doc [the svg document]
     * @return {[object]}     [lookup object containing all elements with ID attribute]
     */
    module.getSVGElementsWithID = function (doc) {
        
        var elements = doc.getElementsByTagName('*'),
            elementContainer = {},
            attributeToFind = 'id',
            i = 0,
            currentElement;
            
        while(currentElement = elements[i++]){
            if (currentElement[attributeToFind]) {
                elementContainer[currentElement[attributeToFind]] = currentElement;
            }
        }
        
        return elementContainer;
    }
    
    /* UTILITY FUNCTIONS END */
    
    return module;
    
})();