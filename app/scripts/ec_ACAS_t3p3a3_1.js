/**
 * This is the animation code for the ec-ACAS-t3p3a1_v3.svg file contained 
 * in the object#ec_ACAS_t3p3a3_1 in page ACASTopic3Page3.html.
 */

;var ec_ACAS_t3p3a3_1 = (function ($, TimelineMax, ecSvgUtilities) {
    
    'use strict';
    
    // Add checking for $ and GSAP with console feedback.
    if($ === null || TimelineMax === null || ecSvgUtilities === null) {
        console.log('jQuery, TimelineMax and ecSvgUtilities are required to animate the SVG. Please ensure you are loading both libraries. Have a nice day :-)');
        return;
    }
    
    var module = {},
        all,
        dt = 0.5, // defaultTime for animations
        audioPath = 'audio',
        audioArray = ['Adjust_Vertical_Speed', 'Clear_Of_Conflict', 'Descend'],
        hideOnStartArray,
        setButtonArray,
        timeline0 = new TimelineMax();
    
    
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
        all = all || ecSvgUtilities.getSVGElementsWithID(document.getElementById(svgLoaderArgsObject.svgDocID).getSVGDocument());
        // An array of elements that will be hidden at the start of the animation.
        hideOnStartArray = [
            all.text3, all.text4, all.text5, all.text6,
            all.buttonReplay, all.buttonNext, all.buttonStart,
            all.arrow3, all.arrow4
        ];
        // Style elements as buttons.
        setButtonArray = [
            all.buttonReplay, all.buttonNext, all.buttonStart
        ];
        
        ecSvgUtilities.createAudio(audioArray, audioPath, all);
        addBehaviours();
        setStartPoint();
        defineTimeline();
        
        timeline0.play(0);
        // Use the line below to jump forward in the timeline
        // to speed up development
        // timeline0.seek('step2+=4').resume();
    };
    
    /**
     * [Return the timeline for external controls]
     * @return {[TimelineMax]} [GSAP TimelineMax]
     */
    module.getTimeline = function () {
        return timeline0;
    };
    
    
    
    
    
    /*------------------------------------*\
     #PRIVATE
    \*------------------------------------*/
    
    /**
     * Build the timeline animation, restart it and pause until user triggers start.
     */
    var defineTimeline = function () {
        
        timeline0
        .to(all.scene1, dt, {delay:0.3, autoAlpha:1})
        .to(all.text5, dt, {delay:dt, autoAlpha:1})
        .to(all.buttonStart, dt, {autoAlpha:1})
        .addPause('step1') // Have to add hide buttons after this as the timeline was forcing the buttons to show again somehow!!
        .set(setButtonArray, {delay:0.1, autoAlpha:0}) // slight delay is required or this tween is triggered, even after the addPause.
        .to(all.text3, dt, {delay:1, autoAlpha:1})
        // .call( ecSvgUtilities.callAudio, ['Descend', all])
        .to(all.acft1, dt, {delay:dt, x: '+=40', ease:Linear.easeNone})
        .to(all.acft1, dt*3, {x: '+=100',  y: '+=43', rotation: "+=23", ease:Linear.easeNone})
        .to(all.acft2, dt*4, {delay:-dt*4, x: '-=60',  y: '+=21', ease:Linear.easeNone})
        .to(all.text6, dt, {delay:1, autoAlpha:1})
        .to(all.buttonNext, dt, {delay:1, autoAlpha:1})
        .addPause('step2')
        .timeScale(1)
        .set(setButtonArray, {delay:0.1, autoAlpha:0})
        .to(all.text4, dt, {delay:1, autoAlpha:1})
        // .call( ecSvgUtilities.callAudio, ['Adjust_Vertical_Speed', all])
        .to(all.acft1, dt*3, {delay:dt*2, x: '+=100',  y: '+=15', rotation: "-=23", ease:Linear.easeNone})
        .to(all.acft2, dt*1, {delay:-dt*3,  y: '+=20', rotation: "+=19", ease:Linear.easeNone})
        .to(all.acft2, dt*4, {delay:-dt*3, x: '-=150', ease:Linear.easeNone})
        .to(all.arrow3, dt, {autoAlpha: 1})
        .to(all.arrow4, dt, {autoAlpha: 1})
        // .call( ecSvgUtilities.callAudio, ['Clear_Of_Conflict', all])
        .to(all.buttonReplay, dt, {delay:1, autoAlpha:1})
        .restart().pause();
        
    };
    
    /**
     * Add event listeners to buttons
     */
    var addBehaviours = function () {
        
        $(all.buttonNext).click(function (e) {
            timeline0.resume();
        });
        
        $(all.buttonStart).click(function (e) {
            timeline0.resume();
        });
        
        $(all.buttonReplay).click(function (e) {
            timeline0.restart();
        });
    };
    
    /**
     * Set elements to how they should be at the start of the animation.
     */
    var setStartPoint = function () {
        TweenMax.set(all.scene1, {autoAlpha:0});
        TweenMax.set(setButtonArray, {cursor:'pointer'});
        TweenMax.set(hideOnStartArray, {autoAlpha:0});
        TweenMax.set([all.acft1, all.acft2], {transformOrigin:"55% 70%"});
    };
    
    
    
    return module;
    
    // Pass 0 instead of expected libraries so can test if missing.
})(window.$ = window.$ || null, window.TimelineMax = window.TimelineMax || null, window.ecSvgUtilities = window.ecSvgUtilities || null);