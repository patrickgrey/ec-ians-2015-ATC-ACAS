var navModule = (function($)
{
    'use strict';

    var topicsAndPages = moduleModel.topicsAndPages;



    function init () {

        checkLocalStorage ();



        // need to save current topics and pages to localStorage
        drawTopics();

        changeTopic (localStorage.getItem('currentTopic'));

    }

    function addStylesToIframe () {
        var ifrm = document.getElementById('iframeContent');
        ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
        // ifrm.document.open();
        // console.log(ifrm);
    }



    // How should the string look?
    // needs to store a page for each topic. So, just an array of numbers!
    // bookmarks = [1, 2, 0]
    // need to be able to hard code this so can refresh on current page working on.

    // Need to add current topic to this!
    function checkLocalStorage () {

        if (!localStorage.getItem('currentTopic')) {localStorage.setItem('currentTopic', 'topic1');}

        var bookmarksObject = {};

        if (!localStorage.getItem('bookmarks')) {

            for (var topic in moduleModel.topicsAndPages){
                bookmarksObject[topic] = 'p1';
            }

            localStorage.setItem('bookmarks', JSON.stringify(bookmarksObject));

        }

    }





    // draw the topic buttons
    function drawTopics() {

            // Clear the topics list of the default item
            $('.nav-topics-ul').empty();

            var topicsListString = '';

            // loop through the topics, setting the first one to active
            for (var topic in moduleModel.topicsAndPages){

                topicsListString += '<li id="'+topic+'List" ><a id="'+topic+'" data-toggle="tooltip" title="first tooltip" href="pleaseEnableJavaScript.html">'+topic+'</a></li>';
                // topicsAndPages[topic].currentPage = "p1";
            }

            //topicsAndPages.currentTopic = "t1";

            // console.log(topicsAndPages['m1']);

            $('.nav-topics-ul').append(topicsListString);

            $('.nav-topics-ul li > a').click(function(event){
                event.preventDefault();
                // console.log("changeTopic: "+$(this).attr('id'));
                changeTopic($(this).attr('id'));
                return false;
            });

            $( '.nav-topics-ul li > a' ).hover(
                function() {
                    // console.log(moduleModel.topicsAndPages[$(this).attr('id')].title);
                    $('.navbar-topic-name').html(moduleModel.topicsAndPages[$(this).attr('id')].title);
                },

                function() {
                    $('.navbar-topic-name').html('Topic Name');
                }
            );


    }




    function changeTopic (topicID) {

        $('.nav-topics-ul li').removeClass('active');
        $('#'+topicID+'List').addClass('active');
        // topicsAndPages.currentTopic = topicID;
        localStorage.setItem('currentTopic', topicID);

        drawPages (topicID);

    }



    function drawPages (topicID) {

        $('.nav-pages-ul').empty();
        //console.log("drawPages:"+topicID);
       /* console.log(topicsAndPages);*/
        var currentModule = topicsAndPages[topicID].pages;

        var pageCount = 1;
        var pagesListString = '';

        for (var page in currentModule){

            pagesListString += '<li id="'+page+'List" ><a id="'+page+'" data-toggle="tooltip" title="first tooltip" href="pleaseEnableJavaScript.html">'+pageCount+'</a></li>';

            pageCount++;
        }

        $('.nav-pages-ul').append(pagesListString);

        $('.nav-pages-ul li > a').click(function(event){

            event.preventDefault();
            // console.log("changePage: "+$(this));
            changePage($(this).attr('id'));
            return false;

        });



        $( '.nav-pages-ul li > a' ).hover(
            function() {
                $('.navbar-page-name').html(moduleModel.topicsAndPages[topicID].pages[$(this).attr('id')].pageTitle);
            },

            function() {
                $('.navbar-page-name').html('Page Name');
            }
        );

        var bookmarksObject = JSON.parse( localStorage.getItem( 'bookmarks' ) );

        //console.log(bookmarksObject);
        changePage (bookmarksObject[topicID]);

    }



    function changePage (pageID) {

        $('.nav-pages-ul li').removeClass('active');
        $('#'+pageID+'List').addClass('active');
        // topicsAndPages[localStorage.getItem('currentTopic')].currentPage = pageID;
        var bookmarksObject = JSON.parse( localStorage.getItem( 'bookmarks' ) );
        bookmarksObject[localStorage.getItem( 'currentTopic' )] = pageID;
        localStorage.setItem('bookmarks', JSON.stringify(bookmarksObject));
        //console.log("pageID: "+pageID);
        //console.log(moduleModel.topicsAndPages[localStorage.getItem('currentTopic')].pages);
        document.getElementById('iframeContent').src = localStorage.getItem('currentTopic')+'/'+moduleModel.topicsAndPages[localStorage.getItem('currentTopic')].pages[pageID].pageURL+".html";

        document.getElementById('iframeContent').onload= function() {

            // $('head', window.frames['iframeContent'].document).append('<link rel="stylesheet" href="../../styles/main.css" type="text/css">');

            // var contentDocument = document.getElementById('iframeContent');
            // console.log($(contentDocument).find('document'));
            // addStylesToIframe();
        };
        //ifrm.$('head').append('<link rel="stylesheet" href="../../styles/main.css" type="text/css">');
        //ifrm.document.write('Hello World!');
        // ifrm.document.close();
    }






    return {
        init:init
    };
}($));

navModule.init();