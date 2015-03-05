/**
 * TODO:
 *     - Fade whole thing in at start to allow elements to be hidden first.
 *     - Add pause and unpause functions
 *     - Look into joining all timelines so can rewind whole thing - or
 *     put all into one timeline and pause at parts...
 */

;var ec_ACAS_t3p3a3_1 = (function ($, TimelineMax) {
    
    'use strict';
    
    // Add checking for $ and GSAP with console feedback.
    if($ === 0 || TimelineMax === 0) {
        console.log('jQuery and TimelineMax are required to animate the SVG. Please ensure you are loading both libraries. Have a nice day :-)');
        return;
    }
    
    var module = {},
        all,
        dt = 0.5, // defaultTime for animations
        audioPath = 'audio',
        audioArray = ['Adjust_Vertical_Speed', 'Clear_Of_Conflict', 'Descend'],
        hideOnStartArray,
        setButtonCursorArray,
        currentTimeline = 1, //  start on 1 as timeline0 called on init.
        timeline0 = new TimelineMax(),
        timeline1 = new TimelineMax(),
        timeline2 = new TimelineMax(),
        timelineArray = [timeline0, timeline1, timeline2];
    
    
    /*------------------------------------*\
     #PUBLIC
    \*------------------------------------*/
    
    /**
     * Initialize animation.
     * @param  {[object]} svgLoaderArgsObject [SVG can only be manipulated once
     * it's loaded. The svgLoadListener.js module is used to listen for loading
     * then calls this init function as a callback. The svgLoaderArgsObject
     * object allows us to safely pass different arguments to different
     * animations while reusing the load.]
     */
    module.init = function (svgLoaderArgsObject) {
        // Get all svg elements with IDs and put into a dictionary object
        // to make referencing easier, removing the need to declare lots of
        // variables for each element.
        all = all || getSVGElementsWithID(document.getElementById(svgLoaderArgsObject.svgDocID).getSVGDocument());
        // An array of elements that will be hidden at the start of the animation.
        hideOnStartArray = [
            all.text3, all.text4, all.text5, all.text6,
            all.buttonReplay, all.buttonNext, all.buttonStart,
            all.arrow3, all.arrow4
        ];
        // Style elements as buttons.
        setButtonCursorArray = [
            all.buttonReplay, all.buttonNext, all.buttonStart
        ];
        
        createAudio();
        addBehaviours();
        setStartPoint();
        defineTimelines();
        module.start();
        
    };
    
    /**
     * [start description]
     * @return {[type]} [description]
     */
    module.start = function () {
        currentTimeline = 0;
        handleNextClick();
    };
    
    module.reset = function () {
        setStartPoint();
        resetTimelines();
    };
    
    module.replay = function () {
        module.reset();
        module.start();
    };
    
    
    /*------------------------------------*\
     #PRIVATE
    \*------------------------------------*/
    
    var defineTimelines = function () {
        
        timeline0
        .to(all.text5, dt, {delay:dt, autoAlpha:1})
        .to(all.buttonStart, dt, {autoAlpha:1})
        // .duration(0.1)
        .stop();
        // setTimeout(function () { handleNextClick();}, 500);
        
        // currentTimeline = 1;
        timeline1
        .to(all.text3, dt, {delay:1, autoAlpha:1})
        .call( callAudio, ['audio2'])
        .to(all.acft1, dt, {delay:dt, x: '+=40', ease:Linear.easeNone})
        .to(all.acft1, dt*3, {x: '+=100',  y: '+=43', rotation: "+=23", ease:Linear.easeNone})
        .to(all.acft2, dt*4, {delay:-dt*4, x: '-=60',  y: '+=21', ease:Linear.easeNone})
        .to(all.text6, dt, {delay:1, autoAlpha:1})
        .to(all.buttonNext, dt, {delay:1, autoAlpha:1})
        // .duration(0.1)
        .stop();
        // setTimeout(function () { handleNextClick();}, 1000);   
        
        // currentTimeline = 2;
        timeline2
        .to(all.text4, dt, {delay:1, autoAlpha:1})
        .call( callAudio, ['audio0'])
        .to(all.acft1, dt*3, {delay:dt*2, x: '+=100',  y: '+=15', rotation: "-=23", ease:Linear.easeNone})
        .to(all.acft2, dt*1, {delay:-dt*3,  y: '+=20', rotation: "+=19", ease:Linear.easeNone})
        .addPause()
        .to(all.acft2, dt*4, {delay:-dt*3, x: '-=150', ease:Linear.easeNone})
        .to(all.arrow3, dt, {autoAlpha: 1})
        .to(all.arrow4, dt, {autoAlpha: 1})
        .call( callAudio, ['audio1'])
        .to(all.buttonReplay, dt, {delay:1, autoAlpha:1})
        // .duration(0.1)
        .stop();
        
    };
    
    var addBehaviours = function () {
        
        $(all.buttonNext).click(function (e) {
            handleNextClick();
        });
        
        $(all.buttonStart).click(function (e) {
            handleNextClick();
        });
        
        $(all.buttonReplay).click(function (e) {
            module.replay();
        });
    };
    
    var handleNextClick = function () {
        $(all.buttonNext).css('visibility', 'hidden');
        $(all.buttonStart).css('visibility', 'hidden');
        timelineArray[currentTimeline].play(0);
        currentTimeline++;
    };
    
    var setStartPoint = function () {
        TweenMax.set(setButtonCursorArray, {cursor:'pointer'});
        TweenMax.set(hideOnStartArray, {autoAlpha:0});
        TweenMax.set([all.acft1, all.acft2], {transformOrigin:"55% 70%"});
    };
    
    var resetTimelines = function () {
        for (var i = timelineArray.length-1; i > 0; i--) {
            timelineArray[i].restart().stop();
        };
    };
    
    
    
    
    
    /* UTILITY FUNCTIONS */
    
    var callAudio = function (audioName) {
        console.log('play audio');
        all[audioName].play();
    };
    /**
     * AUDIO tags can be included in SVG but
     * I decided to keep all audio work in JavaScript as the graphics should be maniputlated
     * by designers and not need to reinsert the audio code each time.
     * I could add AUDIO tags to the page declaritively but
     * I think it is neater to have it all here.
     */
    var createAudio = function () {
        var audio;
        for (var i = 0; i < audioArray.length; i++) {
            audio = document.createElement("audio");
            // $(audio).attr('controls','');
            audio.src = audioPath + '/' + audioArray[i] + '.mp3';
            document.body.appendChild(audio);
            audio.pause();
            audio.currentTime = 0;
            all['audio'+i] = audio;
        };
    };
    
    
    var getSVGElementsWithID = function (doc) {
        
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
    
    // .to( all.acft1, 5, {
    //     bezier:{
    //         values:[ {x:30, y:0}, {x:40, y:0}, {x:200, y:100} ], autoRotate:true
    //     },
    //     delay:.5
    // } ); 
    // .to(all.acft1, dt*2, {delay:dt, x: '+=60',  y: '+=30', rotation: 20});
    
    // console.log(all.acft1._gsTransform.x);
    
    /* UTILITY FUNCTIONS END */
    
    return module;
    
    
})(window.$ = window.$ || 0, window.TimelineMax = window.TimelineMax || 0);