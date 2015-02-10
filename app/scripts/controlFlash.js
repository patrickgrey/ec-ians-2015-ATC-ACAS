var ec_ACAS_ControlFlash = (function($)
{
    'use strict';
    
    var module = {};
    
    // Adobe functions
    function MM_findObj(n, d) { //v4.01
      
      var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
        d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
      if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
      for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
      if(!x && d.getElementById) x=d.getElementById(n); return x;
  
    }

    function controlFlash(event) { //v3.0
      
      var objStr = event.data.objStr;
      var x = event.data.x;
      var cmdName = event.data.cmdName;
      var frameNum = event.data.frameNum;
      
      var obj=MM_findObj(objStr);
      if (obj) eval('obj.'+cmdName+'('+((cmdName=='GotoFrame')?frameNum:'')+')');
    }
    
    /**
     * Initialise links so they show and hide flash containers
     */
    module.init = function (_elementID, objStr,x,cmdName,frameNum) {
            var el = $('#'+_elementID);
            el.click({'objStr': objStr, 'x': x, 'cmdName': cmdName, 'frameNum': frameNum }, controlFlash);
    };

    return module;
    
}($));