;var ec_ACAS_t2_p2_a2_s1 = (function ($, TimelineMax, ecSvgUtilities) {
    
    'use strict';
    
    // Add checking for $ and GSAP with console feedback.
    if($ === null || TimelineMax === null || ecSvgUtilities === null) {
        console.log('jQuery, TimelineMax and ecSvgUtilities are required to animate the SVG. Please ensure you are loading both libraries. Have a nice day :-)');
        return;
    }
    
    var module = {},
        all,
        dt = 0.5, // defaultTime for animations
        hideOnStartArray,
        setButtonArray,
        timeline0 = new TimelineMax();
    
    module.init = function (svgLoaderArgsObject) {
        // Get all svg elements with IDs and put into a dictionary object
        // to make referencing easier, removing the need to declare lots of
        // variables for each element.
        all = all || ecSvgUtilities.getSVGElementsWithID(document.getElementById(svgLoaderArgsObject.svgDocID).getSVGDocument());
        
        hideOnStartArray = [
            all.buttonReplay, all.buttonNext, all.textQuestionMark, all.textTransmitter2Sending, all.textTransmitter2Receives, 
            all.textTransmitter1Altitude, all.textTransmitter1Transmit, all.text1, all.text2, all.text3, all.text4
        ];
        
        setButtonArray = [
            all.buttonReplay, all.buttonNext
        ];
        
        addBehaviours();
        setStartPoint();
        defineTimeline();
        
        timeline0.play(0);
        
    };
    
    /**
     * Build the timeline animation, restart it and pause until user triggers start.
     */
    var defineTimeline = function () {
        // console.log(all.textBinary);
        timeline0
        .to(all.buttonNext, dt, {delay:0.5, autoAlpha:1})
        .addPause('step1')
        .set(setButtonArray, {delay:0.1, autoAlpha:0})
        .to(all.signalCircle, dt, {delay:0.5, scale:1})
        .to(all.textTransmitter1Listen, dt/2, {delay:0.2, autoAlpha:0})
        .to(all.textTransmitter1Transmit, dt, {delay:0.5, autoAlpha:1})
        .to(all.text1, dt, {autoAlpha:1})
        // .call($(all.buttonNext).show)
        .to(all.buttonNext, dt, {autoAlpha:1})
        .addPause('step2')
        .set(setButtonArray, {delay:0.1, autoAlpha:0})
        .to(all.signalCircle, dt*3, {delay:0.5, scale:8, 'stroke-width':2, opacity:0.2})
        .to(all.textTransmitter1Transmit, dt/2, {delay:0.2, autoAlpha:0})
        .to(all.textTransmitter1Listen, dt, {delay:0.5, autoAlpha:1})
        .to(all.textTransmitter2Listen, dt, {delay:0.2, autoAlpha:0})
        .to(all.textTransmitter2Sending, dt, {autoAlpha:1})
        .to(all.text2, dt, {delay:0.5,autoAlpha:1})
        .to(all.buttonNext, dt, {delay:0.5, autoAlpha:1})
        .addPause('step3')
        .set(setButtonArray, {delay:0.1, autoAlpha:0})
        .to(all.signalCircle, dt/2, {delay:0.2, autoAlpha:0})
        .to(all.textQuestionMark, dt*3, {delay:0.5, autoAlpha:0.5, x:-162, y:-73})
        .to(all.textTransmitter1Listen, dt/2, {delay:0.2, autoAlpha:0})
        .to(all.textTransmitter1Altitude, dt, {delay:0.5, autoAlpha:1})
        .to(all.textTransmitter2Sending, dt, {delay:0.2, autoAlpha:0})
        .to(all.textTransmitter2Listen, dt, {autoAlpha:1})
        .to(all.text3, dt, {delay:0.5,autoAlpha:1})
        .to(all.buttonNext, dt, {delay:0.5, autoAlpha:1})
        .addPause('step4')
        .set(setButtonArray, {delay:0.1, autoAlpha:0})
        .to(all.textQuestionMark, dt/2, {delay:0.2, autoAlpha:0})
        .to(all.textBinary, dt*6, {delay:0.5, autoAlpha:1, x:290, y:125})
        .to(all.textTransmitter1Altitude, dt/2, {delay:0.2, autoAlpha:0})
        .to(all.textTransmitter1Listen, dt, {delay:0.5, autoAlpha:1})
        .to(all.textTransmitter2Listen, dt, {delay:0.2, autoAlpha:0})
        .to(all.textTransmitter2Receives, dt, {autoAlpha:1})
        .to(all.text4, dt, {delay:0.5,autoAlpha:1})
        .to(all.buttonReplay, dt, {autoAlpha:1})
        .restart().pause();
        
        // ****************************
        // 
        // 
        // !!!!!!!!!!!!!!!!!!!!!!
        // 
        // 
        // 
        // **************************
        // 
        // 
        // The following values are required in SVG linear gradient to work as mask. 
        // Illustrator won't let me enter these values so saving .ai file as .svg will overwrite these values
        /*<linearGradient id="SVGID" gradientUnits="userSpaceOnUse" x1="129" y1="389.8189" x2="315" y2="389.8189" gradientTransform="matrix(-1 0 0 1 544 0)">
        <stop  offset="0" style="stop-color:#A2CEF9"/>
        <stop  offset="0.64" style="stop-color:#A2CEF9;stop-opacity:1"/>
        <stop  offset="0.8587" style="stop-color:#A2CEF9;stop-opacity:0.1413"/>
        <stop  offset="1" style="stop-color:#A2CEF9;stop-opacity:0"/>
    </linearGradient>
    <rect x="229" y="326.64" class="st7" width="186" height="126.36"/>
    <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="0" y1="273.1811" x2="186" y2="273.1811">
        <stop  offset="0" style="stop-color:#A2CEF9"/>
        <stop  offset="0.64" style="stop-color:#A2CEF9;stop-opacity:1"/>
        <stop  offset="0.8587" style="stop-color:#A2CEF9;stop-opacity:0.1413"/>
        <stop  offset="1" style="stop-color:#A2CEF9;stop-opacity:0"/>
    </linearGradient>*/
    // ****************************
        // 
        // 
        // !!!!!!!!!!!!!!!!!!!!!!
        // 
        // 
        // 
        // **************************
    };
    
    var addBehaviours = function () {
        
        $(all.buttonNext).click(function (e) {
            // $(this).hide();
            // TweenMax.set($(this), {autoAlpha:0});
            timeline0.resume();
        });
        
        $(all.buttonReplay).click(function (e) {
            // $(this).hide();
            timeline0.restart();
        });
    };
    
    /**
     * Set elements to how they should be at the start of the animation.
     */
    var setStartPoint = function () {
        TweenMax.set([all.signalCircle], {transformOrigin:"50% 50%"});
        TweenMax.set(all.signalCircle, {scale: 0});
        TweenMax.set(setButtonArray, {cursor:'pointer'});
        TweenMax.set(hideOnStartArray, {autoAlpha:0});
    };
    
    return module;
    
    
})(window.$ = window.$ || null, window.TimelineMax = window.TimelineMax || null, window.ecSvgUtilities = window.ecSvgUtilities || null);