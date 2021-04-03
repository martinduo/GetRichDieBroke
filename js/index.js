//function loadProducts() {
//    //alert('.Grid-host 2 = ' + parseInt($('.Grid-host').css('marginTop').replace('px', '')));
//    //alert('.ContentColumn = ' + parseInt($('.ContentColumn').css('margin-top').replace('px', '')));

//    //Compare outer and inner height/widths to get the total margin and padding (plus border):
//    var that = $(".Grid-host");
//    alert(that.outerHeight(true) - that.innerHeight());

//}

(function () {
    "use strict";

    var width1001Check, portraitOrientationCheck;

    function showHome() {
        console.log("showHome");
    }

    $( window ).load(function() {
      init();
    })

    //window.addEventListener("load", function load() {
    //    window.removeEventListener("load", load, false);
    //    init();
    //}, false);

    function init() {
        var splashHang = 2000; //keep the splash screen visible for at least this long ms

        //if ((navigator.appVersion.indexOf("Mobile") > 0) && !(navigator.userAgent.match('CriOS')) ) { //tell user to get the iPad app
        //    $('#no-mobile').removeClass('hide-splash-error-text').addClass('splash-error-text');
        //    return;
        //}

        //var FFox = false;
        //if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        //    FFox = true; //FireFox version 28 still does not handle flexbox correctly for my layout
        //}

      //$('#splashlogo').addClass('hide-splash-error-text');
      //
      //$('#no-flex').removeClass('hide-splash-error-text').addClass('splash-error-text');
      //return;
      //
      //$("#too-small").removeClass('hide-splash-error-text').addClass('splash-error-text'); //the warning is shown and the splash screen stays
      //return;

      if (window.matchMedia) {
        var mql = window.matchMedia("screen and (max-width: 765px)");
        if (mql.matches){ // it is too small a device
          $("#too-small").removeClass('hide-splash-error-text').addClass('splash-error-text'); //the warning is shown and the splash screen stays
          return;
        }
      } else { //no matchMedia, tell user to get modern browser
        $('#no-flex').removeClass('hide-splash-error-text').addClass('splash-error-text');
        return;
      }

      if (!$('html').hasClass('flexbox')) { //Show splash screen text to tell user to get modern browser
        $('#no-flex').removeClass('hide-splash-error-text').addClass('splash-error-text');
        return;
      }

      initializeProgram(splashHang);

      //These operations are not used now since the chart container is not resized any more
        //// Establishing media check
        //width1001Check = window.matchMedia("(min-width: 1001px)"),
        //portraitOrientationCheck = window.matchMedia("(orientation: portrait)");
        //// Add listeners for detecting changes
        //width1001Check.addListener(newWidthValue);
        //portraitOrientationCheck.addListener(newOrientationValue);
    }

    //These operations are not used now since the chart container is not resized any more
    //handle browser windows
    //function newWidthValue(mediaQueryList) {
        //$(".titleText").css('color', "#ff0000"); //to test operation
        //respondToLayoutSwitch();
    //}
    //handle iPad orientation
    //function newOrientationValue(mediaQueryList) {
        //$(".titleText").css('color', "#ff0000"); //to test operation
        //respondToLayoutSwitch();
    //}
    //var respondingAlready = false;
    //This function is not used now since the chart container never is resized any more
    //function respondToLayoutSwitch() {
    //    if (respondingAlready) return;
    //    respondingAlready = true; //only one response wanted
    //    setTimeout(function () {
    //        respondingAlready = false;
    //        $("#debug").append("redrawCharts ");
    //        redrawCharts(false);
    //    }, 100);
    //    //redrawCharts(false);
    //    //switchToHomePage(10);
    //}




    // INFO IE and Opera need some fixing to display the correct height of nested table grids.
    // NOTE Fortunately IE *and* Opera both implement attachEvent() and they seem to be
    //      the only browsers, so we can use it as a filter as well.
    function fixGrid() {
        var grid = document.getElementById('Inside');
        grid.style.height = null; // NOTE Remove old height before getting new value.
        grid.style.height = grid.parentNode.offsetHeight + 'px';
    }
    if (window.attachEvent) {
        window.attachEvent('onload', fixGrid);
        window.attachEvent('onresize', fixGrid);
    }

}());

var MSAPPBuild = (typeof MSApp !== "undefined"); //True if building a Win8 Store App
var MYAppInsertHTML = function (node, data) {

    if (node.selector.substr(0, 7) === "#header") { return;} //ignore

    if (MSAPPBuild) {
        MSApp.execUnsafeLocalFunction(function () { node.html(data); });
    } else {
        node.html(data);
    }
}
var MYAppAppendHTML = function (node, data) {
    if (MSAPPBuild) {
        MSApp.execUnsafeLocalFunction(function () { node.append(data); });
    } else {
        node.append(data);
    }
}
var MYAppPrependHTML = function (node, data) {
    if (MSAPPBuild) {
        MSApp.execUnsafeLocalFunction(function () { node.prepend(data); });
    } else {
        node.prepend(data);
    }
}
