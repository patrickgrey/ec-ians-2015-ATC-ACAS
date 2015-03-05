/**
 * This is the animation code for the ec-ACAS-t3p3a3_2.svg file contained 
 * in the object#ec_ACAS_t3p3a3_2 in page ACASTopic3Page3.html.
 */

;var ec_ACAS_t3p3a3_3 = (function ($, TimelineMax, ecSvgUtilities) {
    
    'use strict';
    
    // Add checking for $ and GSAP with console feedback.
    // Add checking for $ and GSAP with console feedback.
    if($ === null || TimelineMax === null || ecSvgUtilities === null) {
        console.log('jQuery, TimelineMax and ecSvgUtilities are required to animate the SVG. Please ensure you are loading both libraries. Have a nice day :-)');
        return;
    }
    
    var module = {},
        all,
        dt = 0.5, // defaultTime for animations
        audioPath = 'audio',
        audioArray = ['Climb', 'Descend_Now', 'Clear_Of_Conflict'],
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
        // console.log(all);
        // An array of elements that will be hidden at the start of the animation.
        hideOnStartArray = [
            all.text3, all.text4, all.text5, all.text6, all.text6_1_,
            all.buttonReplay, all.buttonNext, 
            all.arrow2, all.arrow3_1_, all.arrow5, all.arrow6
            // all.arrow1, all.arrow3_1_, 
        ];
        // Style elements as buttons.
        setButtonArray = [
            all.buttonReplay, all.buttonNext
        ];
        
        ecSvgUtilities.createAudio(audioArray, audioPath, all);
        addBehaviours();
        setStartPoint();
        defineTimeline();
        
        timeline0.play(0);
        // Use the line below to jump forward in the timeline
        // to speed up development
        // timeline0.seek('step2').resume();
    };
    
    /**
     * [Return the timeline for external controls]
     * @return {[TimelineMax]} [GSAP TimelineMax]
     */
    module.getTimeline = function () {
        return timeline0;
    };
    
    /**
     * For some reason, the bezier wouldn't reset so I need to call this to
     * hard reset the animation.
     */
    module.forceReset = function () {
        if(all){
            TweenMax.set(all.acft1, {x:0, y:0, rotation: 0});
        }
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
        // .set(all.acft1, {x:0, y:0})
        .to(all.buttonNext, dt, {autoAlpha:1})
        .addPause('step1') // Have to add hide buttons after this as the timeline was forcing the buttons to show again somehow!!
        .set(setButtonArray, {delay:0.1, autoAlpha:0}) // slight delay is required or this tween is triggered, even after the addPause.
        .to(all.acft2, dt*2, {x: '-=60',  y: '+=17', ease:Linear.easeNone})
        .to(all.text3, dt, {delay:1, autoAlpha:1})
        .call( ecSvgUtilities.callAudio, ['Climb'])
        .to(all.acft1, 2, {
            delay:1, 
            bezier: {
                type:'thru',
                values:[{x:0,y:0},
                       {x:55,y:-6},
                       {x:109,y:-20}],
                autoRotate: true,
                timeResolution: 8,
                ease:Linear.easeNone
            }
            
        })
        
        .to(all.arrow2, dt, { autoAlpha: 1})
        .to(all.text6, dt, {autoAlpha:1})
        .to(all.buttonNext, dt, {autoAlpha:1})
        .addPause('step2')
        .set(setButtonArray, {delay:0.1, autoAlpha:0})
        .to(all.acft2, dt*2, {x: '-=60',  y: 15, rotation: "+=17", ease:Linear.easeNone})
        .to(all.arrow3_1_, dt, {autoAlpha:1})
        .to(all.text6_1_, dt, {delay:1, autoAlpha:1})
        .to(all.buttonNext, dt, {autoAlpha:1})
        .addPause('step3')
        .set(setButtonArray, {delay:0.1, autoAlpha:0})
        .to(all.text4, dt, {delay:1, autoAlpha:1})
        .call( ecSvgUtilities.callAudio, ['Descend_Now'])
        .to(all.acft1, 4, {
            delay:3, 
            bezier: {
                type:'thru',
                values:[{x:109,y:-20},
                       {x:141,y:-15},
                       {x:188,y:39},
                       {x:282,y:81},
                       {x:338,y:85}],
                autoRotate: true,
                timeResolution: 8,
                ease:Linear.easeNone
            }
            
        })
        .to(all.arrow5, dt, {autoAlpha:1})
        .call( ecSvgUtilities.callAudio, ['Clear_Of_Conflict'])
        .to(all.buttonReplay, dt, {autoAlpha:1})
        .restart().pause();
        
    };
    
    /*.to("#div1", 1, {x:400,y:75})
    .to("#div1", 1, 
   {
     bezier:
     {
       values:[{x:400,y:75},
               {x:350,y:50},
               {x:300,y:100}]
     }
   })*/
    
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
            module.forceReset();
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