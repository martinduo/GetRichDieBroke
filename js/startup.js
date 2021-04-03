
// **********************************
// * Copyright 2013 by Bruce Martin *
// *      All rights reserved		*
// **********************************

// GLOBALS
var getSpouseData; //keep this global for compatibility with old version code
var appObject = {};
var exampleObject = {};
var doCalculation;
var showPanels;
var missingdata;
var errors = {}; //remember data entry errors outstanding, via the associated field IDs
var savedAppDataText; //most recient saved app data for local storage
var myCarousel = null; //my global for progammatically moving carousel

var currentLocalStorageKey = "userData"; //default until changed for example data

var exampleData = {
    exampleDataText1: '{"HouseObject": {"married": false, "payoutliving": "80,000", "taxrate": "21%", "cola": "2%", "globalroi": "3.5%" }, "YouObject": { "payoutgifts": "9,000", "retireage": "66", "birthyear": "1962", "lifeage": "99", "normbal": "73,000", "normsaveamount": "2,000", "irabal": "120,000", "irasaveamount": "5,000", "x401bal": "21,000", "x401saveamount": "2,300", "normpension": "42,000", "pensionpercent": "50%", "ssbenefit": "18,000", "ssbenefitstartage": "66" }, "SpouseObject": { "payoutgifts": "3,000", "retireage": "66", "birthyear": "1966", "lifeage": "99", "normbal": "55,000", "normsaveamount": "1,200", "irabal": "44,000", "irasaveamount": "5,000", "normpension": "23,000", "spousesalary": "28,000", "ssbenefit": "17,000", "ssbenefitstartage": "66" } }',
    exampleDataText2: '{"HouseObject": {"married": true, "payoutliving": "100,000", "taxrate": "22%", "cola": "3%", "globalroi": "4%" }, "YouObject": { "payoutgifts": "10,000", "retireage": "70", "birthyear": "1952", "lifeage": "99", "normbal": "340,000", "normsaveamount": "50,000", "irabal": "270,000", "irasaveamount": "5,000", "normpension": "50,000", "pensionpercent": "60%", "ssbenefit": "21,000", "ssbenefitstartage": "65" }, "SpouseObject": { "payoutgifts": "0", "retireage": "70", "birthyear": "1960", "lifeage": "99", "normbal": "200,000", "normsaveamount": "10,000", "irabal": "100,000", "irasaveamount": "5,000", "spousesalary": "28,000", "ssbenefit": "18,000", "ssbenefitstartage": "65" } }',
    exampleDataText3: '{"HouseObject": {"married":true,"payoutliving":"100,000","taxrate":"22%","cola":"3%","globalroi":"4%","normbal":"630,000","lumpsum":"200,000","lumpsumyear":"2018"},"YouObject":{"retireage":"70","birthyear":"1952","lifeage":"99","normbal":"340,000","normsaveamount":"50,000","irabal":"270,000","irasaveamount":"5,000","normpension":"50,000","pensionpercent":"60%","ssbenefit":"21,000","ssbenefitstartage":"65","payoutgifts":"10,000"},"SpouseObject":{"payoutgifts":"0","retireage":"70","birthyear":"1960","lifeage":"99","normbal":"200,000","normsaveamount":"10,000","irabal":"180,000","irasaveamount":"5,000","spousesalary":"28,000","ssbenefit":"18,000","ssbenefitstartage":"65"}}',
    testDataText: '{"HouseObject":{"married":true,"payoutliving":"120,000","taxrate":"22%","cola":"3%","globalroi":"2%","normbal":"500,000"},"YouObject":{"retireage":"65","birthyear":"1932","lifeage":"99","irabal":"500,000","ssbenefit":"18,000","ssbenefitstartage":"65"},"SpouseObject":{"retireage":"70","birthyear":"1943","lifeage":"99","irabal":"1,200,000","ssbenefit":"20,000","ssbenefitstartage":"70","normpension":"69,000"}}',
    savingDemo: '{"HouseObject":{"married":true,"payoutliving":"45,000","taxrate":"22%","cola":"2.5%","globalroi":"3%","normbal":"182,000"},"YouObject":{"retireage":"65","birthyear":"1958","lifeage":"99","normbal":"340,000","irabal":"115,000","ssbenefit":"18,000","ssbenefitstartage":"65","normsaveamount":"17,000","irasaveamount":"5,500"},"SpouseObject":{"retireage":"66","birthyear":"1968","lifeage":"99","normbal":"200,000","irabal":"232,000","ssbenefit":"26,000","ssbenefitstartage":"70","normpension":"35,000","irasaveamount":"5,500","spousesalary":"20,000","normsaveamount":"3,000"}}',
    retiredDemo: '{"HouseObject":{"married":true,"payoutliving":"90,000","taxrate":"22%","cola":"2.5%","globalroi":"3%","normbal":"164,000"},"YouObject":{"retireage":"65","birthyear":"1940","lifeage":"99","irabal":"230,000","ssbenefit":"18,000","ssbenefitstartage":"65"},"SpouseObject":{"retireage":"66","birthyear":"1942","lifeage":"99","irabal":"260,000","ssbenefit":"20,000","ssbenefitstartage":"70","normpension":"50,000"}}',
};

//Demo Orange: User Stuff
var OrangeNormal = 0; //background color for list block normal
var OrangeActive = 1; //background color for list block active

//Demo Emerland: 1st example
var GrassLite = 20;
var GrassDark = 21;
var EmerlandNormal = 8; //background color for list block normal
var EmerlandActive = 9; //background color for list block active

//Demo Alizarin: 2nd example
var ButtersweetLite = 22;
var ButtersweetDark = 23;
var AlizarinNormal = 4; //background color for list block normal
var AlizarinActive = 5; //background color for list block active

var listBlockNormalColors = {
    userData: OrangeNormal,
    savingDemo: GrassLite, //EmerlandNormal,
    retiredDemo: ButtersweetLite, //AlizarinNormal,
};

var listBlockActiveColors = {
    userData: OrangeActive,
    savingDemo: GrassDark, //EmerlandActive,
    retiredDemo: ButtersweetDark, //AlizarinActive,
};

var labelOneTitles = {
    userData: "Plan For Your Retirement", //this is the default, the normal user info page
    savingDemo: "Green Demo Help", //this is used to show demo1 info pages
    retiredDemo: "Red Demo Help", //this is used to show demo2 info pages
};

var pageTitleTextLine = {
    userData: "Get Rich Die Broke", //this is the default, the normal user info page
    savingDemo: "Get Rich Die Broke - Green Demo", //this is used to show demo1 info pages
    retiredDemo: "Get Rich Die Broke - Red Demo", //this is used to show demo2 info pages
};

var pageTitleColorValue = {
    userData: "Black", //this is the default, the normal user info page
    savingDemo: "#00cc00", //this is used to show green demo info pages
    retiredDemo: "#ff0000", //this is used to show red demo info pages
};

var list1Name = {
    userData: "tabs-1", //this is the default, the normal list1 target page
    savingDemo: "tabs-8", //this is used to show green demo list1 target page
    retiredDemo: "tabs-9", //this is used to show red demo list1 target page
};

var iconButtonMenuClass = {
    userData: "iconButtonMenu", //this is the default, the normal right margin
    savingDemo: "iconButtonMenuDemo", //this is used to show green demo right margin
    retiredDemo: "iconButtonMenuDemo", //this is used to show red demo right margin
}

var pageTitleText = pageTitleTextLine['userData'];
var pageTitleColor = pageTitleColorValue['userData'];
var colorIndexListNormal = listBlockNormalColors['userData']; //background color for list block normal
var colorIndexListActive = listBlockActiveColors['userData']; //background color for list block active

var title1 = labelOneTitles["userData"];
var title2 = "The Fundamental Data";
var title3 = "Savings & Other Accounts";
var title4 = "IRAs And Other Plans";
var title5 = "Pensions & Other Income";
var title6 = "See The Money Charts";
var title7 = "Randomness Mixes It Up";

var iOS = false;
var niceScrollObj;
var currentBlockId = "";
var gestureBlockId = "";
var currentPageId = "tabs-0";
var currentPageScrollPosition = 0;
var gestureActive = false;
var displaySwitching = false;
var fadeOutTime = 200;
var fadeInTime = 400;
var displaySwitchResetTime = 700; //greater than fadeOutTime + fadeInTime, for backup

var colorSilver = "#bdc3c7"; //removed from colorSwatches list to maintain its coherence with: http://designmodo.github.io/Flat-UI/
var colorSwatches = {
    //-----------------Index---
    "Sun flower": "#f1c40f",
    "Orange": "#f39c12",
    "Carrot": "#e67e22",
    "Pumpkin": "#d35400",
    "Alizarin": "#e74c3c",
    "Pomegranate": "#c0392b",
    //------------------Input---
    "Turquoise": "#1abc9c",
    "Green sea": "#16a085",
    "Emerland": "#2ecc71", //8
    "Nephritis": "#27ae60", //9
    "Peter river": "#3498db",
    "Belize hole": "#2980b9",
    "Amethyst": "#9b59b6",
    "Wisteria": "#8e44ad",
    //------------------Intro---
    "Clouds": "#ecf0f1", //14
    "Light Silver": "#D8DBDF",
    "Concrete": "#95a5a6",
    "Asbestos": "#7f8c8d",
    "Wet asphalt": "#34495e",
    "Midnight blue": "#2c3e50",
    //------------Greenish Demo-----
    "Grass Lite": "#a0d468", //20
    "Grass Dark": "#8cc152",
    //------------Redish Demo-----
    "Buttersweet Lite": "#fc6e51", //22
    "Buttersweet Dark": "#e9573f",
    //------------Lavander Demo-----
    "Lavander Lite": "#ac92ec", //24
    "Lavander Dark": "#967adc",
    //------------Aqua Demo-----
    "Aqua Lite": "#4fc1e9", //26
    "Aqua Dark": "#3bafda",
};
var colorSwatchKeys = Object.keys(colorSwatches); //put the keys into an array
//to obtain a color: colorSwatches[colorSwatchKeys["Clouds"]]

var hasTouch = 'ontouchstart' in window;
var msTouch = window.navigator.msMaxTouchPoints ? true : false;
var scrollHomeData;
var keypadPin = []; //array of 4 digits


var appBarPlanClicked = function (e) {
    //switch to a new plan
    e.stopPropagation();
    var id = e.currentTarget.id;
    var target = $("#" + id);
    target.removeClass('pulse' + ' animated')
        .addClass('pulse' + ' animated')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            target.removeClass('pulse' + ' animated');
            appBarPlanClicked_2(id);
        });
};
var appBarPlanClicked_2 = function (id) {
    //$("#helpDebug").text(navigator.appVersion + " 55"); //Testing in iPad output
    switchAppData(id);
    recoverAppData(currentLocalStorageKey); //read from local storage
    restoreDomData(); //show the html user data
    closeMenu(); //close the menu
    myCarousel = null; //signals chart page rebuild needed
};

var appBarClearDataClicked = function (e) {
    e.stopPropagation();
    var id = e.currentTarget.id;
    var target = $("#" + id);
    target.removeClass('pulse' + ' animated')
        .addClass('pulse' + ' animated')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            target.removeClass('pulse' + ' animated');
            appBarClearDataClicked_2(id);
        });
};
var appBarClearDataClicked_2 = function (id) {
    keypadPin.length = 0;
    savePin(keypadPin); //clear saved digits
    appObject = { HouseObject: {}, YouObject: {}, SpouseObject: {} }; //start clean
    appObject.HouseObject.married = true; //initial default unless overwritten from saved json data
    saveAppData(); //save the empty data object
    restoreDomData(); //put empty data object into DOM input fields
    closeMenu(); //close the slide-out left menu
}

var appBarSetPinClicked = function (e) {
    e.stopPropagation();
    var id = e.currentTarget.id;
    var target = $("#" + id);
    target.removeClass('pulse' + ' animated')
        .addClass('pulse' + ' animated')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            target.removeClass('pulse' + ' animated');
            appBarSetPinClicked_2(id);
        });
};
var appBarSetPinClicked_2 = function (id) {
    keypadPin.length = 0;
    savePin(keypadPin); //clear saved digits
    keypadIndex = 0; //init sequence
    verifyKeypadDigits = false; //controls test
    $("#keypadOverlay").fadeIn('fast'); //put key pad over the home screen, user must enter pin or exit program
    enableKeypadEventHandling(); //prepare for keypad use
    closeMenu(); //close the slide-out left menu
}
var appBarUserCommentClicked = function (e) {
    //When users click on the link, we replace the href attribute of the clicked element.
    //Be careful; don't prevent the default comportment (event.preventDefault),
    //we must let it occur because we have just replaced the href where to go
    //I think robots can't see it, maybe the address is protected from spam.
    e.stopPropagation();
    var id = e.currentTarget.id;
    var target = $("#userComment");
    $(this).attr('href', 'mailto:support@martinapps.com?subject=GetRichDieBroke'); //must do this before giving up control
    target.removeClass('pulse' + ' animated')
        .addClass('pulse' + ' animated')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            target.removeClass('pulse' + ' animated');
            closeMenu(); //close the slide-out left menu
        });
};

var removeSplashScreen = function () {
    $("#splashScreen").fadeOut(1, function () {
        testForKeyPad();
     });
}

testForKeyPad = function () {
    keypadPin = recoverPin(); //get user's pin if any
    if (typeof (keypadPin) != "undefined" && keypadPin.length === 4) {
        keypadIndex = 0; //init sequence
        verifyKeypadDigits = true; //controls test
        acceptPIN = true; //assumed result
        $("#keypadOverlay").fadeIn('fast'); //put key pad over the home screen, user must enter pin
        enableKeypadEventHandling(); //prepare for keypad use
    } else {
        $("#HomePage").fadeIn(fadeInTime);
    }
}

var keypadIndex, verifyKeypadDigits, acceptPIN;
var doKeypad = function (e) {
    var target = e.currentTarget;
    var diget = e.currentTarget.innerText;

    $(target).removeClass('pulse' + ' animated')
        .addClass('buttonColor2')
        .addClass('pulse' + ' animated')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(target).removeClass('pulse' + ' animated').removeClass('buttonColor2');
            testKeypadState(target, diget);
        });

    ////*************************************
    //if (verifyKeypadDigits) { //test 4 PIN digits
    //    if (keypadIndex < 4) {
    //        if (diget !== keypadPin[keypadIndex]) {
    //            acceptPIN = false; //flag error
    //        }
    //        keypadIndex += 1;
    //    }
    //    if (keypadIndex > 3) {
    //        if (acceptPIN) {  //allow user to continue
    //            $(target).removeClass('pulse' + ' animated').removeClass('buttonColor2');
    //            $("#keypadOverlay").fadeOut('fast', function () {
    //                $("#HomePage").fadeIn(fadeInTime);
    //            });
    //        } else { //user must close program to exit
    //            $("#keypadButtons div").removeClass('shake' + ' animated').addClass('shake' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    //                $(this).removeClass('shake' + ' animated');
    //            });
    //        }
    //    }
    //} else { //accept the first 4 new PIN digits
    //    keypadPin[keypadIndex] = diget;
    //    keypadIndex += 1;
    //    if (keypadIndex > 3) {
    //        $(target).removeClass('pulse' + ' animated').removeClass('buttonColor2');
    //        savePin(keypadPin);
    //        $("#keypadOverlay").fadeOut('fast'); //allow user to continue
    //    }
    //}
    ////*************************************
}

var testKeypadState = function (target, diget) {
    if (verifyKeypadDigits) { //test 4 PIN digits
        if (keypadIndex < 4) {
            if (diget !== keypadPin[keypadIndex]) {
                acceptPIN = false; //flag error
            }
            keypadIndex += 1;
        }
        if (keypadIndex > 3) {
            if (acceptPIN) {  //allow user to continue
                $(target).removeClass('pulse' + ' animated').removeClass('buttonColor2');
                $("#keypadOverlay").fadeOut('fast', function () {
                    $("#HomePage").fadeIn(fadeInTime);
                });
            } else { //user must close program to exit
                $("#keypadButtons div").removeClass('shake' + ' animated').addClass('shake' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass('shake' + ' animated');
                });
            }
        }
    } else { //accept the first 4 new PIN digits
        keypadPin[keypadIndex] = diget;
        keypadIndex += 1;
        if (keypadIndex > 3) {
            $(target).removeClass('pulse' + ' animated').removeClass('buttonColor2');
            savePin(keypadPin);
            $("#keypadOverlay").fadeOut('fast'); //allow user to continue
        }
    }
}

var KeypadEventHandling = false;
var enableKeypadEventHandling = function () {
    if (!KeypadEventHandling) {
        KeypadEventHandling = true;
        $("#keypadButtons").hammer().on("touch", "div", doKeypad); //delegate event handling for keypad use
    }
    //$("#keypadButtons").hammer().on("touch", "div", doKeypad); //delegate event handling for keypad use
    //setTimeout(function () {
    //    $("#keypadButtons").hammer().off("touch", "div", doKeypad); //remove event handling attached for keypad use
    //}, 10000);
}

var showKeypadOverlay = function () {
    $("#keypadOverlay").fadeIn(fadeInTime); //put key pad over current screen, user enters pin
}

//switch from Charts page back to the Home page
var switchToHomePage = function (outTime) {
    var myOutTime = outTime || fadeOutTime;
    $("#chartsPage").fadeOut(myOutTime, function () {
        $("#HomePage").fadeIn(fadeInTime);
        //reset Charts page prompts
        MYAppInsertHTML($("#roi-prompt"), "Change ROI:");
        MYAppInsertHTML($("#cola-prompt"), "Change COLA:");
        MYAppInsertHTML($("#tax-prompt"), "Change TAX:");
        $("#roi-prompt").css('color', 'black');
        $("#cola-prompt").css('color', 'black');
        $("#tax-prompt").css('color', 'black');
    });
    //recover the saved app data to restore the user's values for tax, roi, cola, etc
    //so that the calculation math can correctly convert to rate fractions again by deviding by 100
    recoverAppData(currentLocalStorageKey); //read from local storage
}

//switch from Home page to Charts page DOM
var switchToChartsPage = function () {
    var options = {
        verifyData:true,
        switchPages:true,
    };
    return startChartPage(options); //returns possible error message
}

//redraw the charts page graphs
var redrawChartsPage = function () {
    var options = {
        testRate: true,
    };
    startChartPage(options);
}

var startChartPage = function (options) {
    var inOptions = options || {};
    var verifyData = inOptions.verifyData || false;
    var switchPages = inOptions.switchPages || false;
    var testRate = inOptions.testRate || false;
    var errorMsg = prepareDataForCalculation(getSpouseData);
    if (verifyData && errorMsg) {
        return errorMsg; //error report about user data, abort charts
    }
    if (switchPages) {

        $("#HomePage").fadeOut(fadeOutTime, function () {
            $("#chartsPage").fadeIn(fadeInTime, function () {
                buildContolPanel(); //when switching from home page to the chart page, do the initial DragDealer slider setups
            }); //Note: delay setting up DragDealer sliders until after DOM settles
        });
    }
    if (testRate) { //test effect of new rate from slider adjustment
        //modify the demo app data for calculation using the slider adjusted rate values
        HouseObject.taxrate = parseFloat(cleanNumber(Trim($("#tax-handle").text()), -1)) //minus 1 is the specified default return from cleanNumber
        //Done in initializeCalculationStart() -- HouseObject.taxrate = HouseObject.taxrate / 100 // set up for multiplier

        //HouseObject.cola = parseFloat(cleanNumber(Trim($("#colarate").val()), -1)) //minus 1 is the specified default return from cleanNumber
        HouseObject.cola = parseFloat(cleanNumber(Trim($("#cola-handle").text()), -1)) //minus 1 is the specified default return from cleanNumber
        //Done in initializeCalculationStart() -- HouseObject.cola = HouseObject.cola / 100 // set up for multiplier

        HouseObject.globalroi = parseFloat(cleanNumber(Trim($("#roi-handle").text()), -1)) //minus 1 is the specified default return from cleanNumber
        //Done in initializeCalculationStart() -- HouseObject.globalroi = HouseObject.globalroi / 100 // set up for multiplier
    }
    initializeCalculationStart();
    doCalculationCycles();
    carouselPaneCount = buildCharts(); //build the chart graphs and data tables html in DOM

    if (switchPages) { //when switching from home page to the chart page, do the initial carousel setups
        myCarousel = startCarousel(carouselPaneCount); //initialize the chart carousel display
        //currentHeaderId = "header-0"; //initialize the header display status
        currentTableId = "table-0"; //initialize the data grid tables display status
        currentCarouselPane = "0";  //initialize the pagination display status
    } else { //when in the chart page and only redrawing the chart bars, keep the current chart panel displayed
        myCarousel = startCarousel(carouselPaneCount, currentCarouselPane); //reset the chart carousel display, keeping current chart
    }
    $(".chartspagetitle").css('color', pageTitleColorValue[currentLocalStorageKey]);
    $(".chartspagetitle").text(pageTitleTextLine[currentLocalStorageKey]);
}

var initializeProgram = function (splashHang) {
    if (splashHang > 0) {
        setTimeout(removeSplashScreen, splashHang); //allow enough time seeing splash, if keypadPin has digits, keypad is displayed after splash screen
    } else {
        testForKeyPad();
    }
    startHomePage();
}

//First routine called for home page initialization
var startHomePage = function () {
    var i = 0,
        iDevice = ['iPad', 'iPhone', 'iPod'];
    for (; i < iDevice.length ; i++) {
        if (navigator.platform === iDevice[i]) { iOS = true; break; }
    }
    if (!iOS) { // hide the full screen buttons which are only for use on the iPad
        $(".screenButton").addClass('display-none');
    }
    $(".screenButton").addClass('display-none'); //the fullscreen APIs are only available on IE11 as of 3/2014

    buildTabs(); //build the home page html layout
    //RECOVERDATA("exampleDataText3"); //get data from example to create test user data
    recoverAppData(currentLocalStorageKey); //read from local storage
    restoreDomData(); //show the html user data
    restoreListBlocks(); //restore user's selection and demo changes
};

var RECOVERDATA = function (exampleDataName) {
    loadExampleData(exampleDataName); //load static data to memory
    saveAppData(); //makes example data the working copy for userdata key
};

var testExampleRequest = function () {
    //switchAppData("test2DataText");
    //localStorage["userData"] = savedAppDataText; //reset userdata as part of test
    switchAppData("savingDemo");
    //switchAppData("retiredDemo");
    startHomePage();
};

//this routine called from home page appbar to switch working copy to canned demo data or back to user's data
var switchAppData = function (exampleDataName) {
    var nextPageId;
    if (exampleDataName && exampleData[exampleDataName]) {
        loadExampleData(exampleDataName); //load static data to memory
        currentLocalStorageKey = exampleDataName; //use demo name for local storage key
        saveAppData(); //makes example data the working copy for changing values. Note that changes do not persist over sessions.
    } else {
        currentLocalStorageKey = "userData"; //reset to user name for local storage key
    }
    currentBlockId = ""; //reset global to initial state
    nextPageId = "tabs-0"; //reset to initial 1st page
    colorIndexListNormal = listBlockNormalColors[currentLocalStorageKey]; //background color for list block normal
    colorIndexListActive = listBlockActiveColors[currentLocalStorageKey]; //background color for list block active
    $("#list1text").text(labelOneTitles[currentLocalStorageKey]);
    $(".colortable").css('background-color', getSwatchColor(colorIndexListNormal)); //set all listing blocks to selected color
    $(".colortablelisting").css("color", "#34495e"); // set all text to Wet Asphalt color
    animateThePageSwitch(currentPageId, nextPageId);
    currentPageId = nextPageId;
    closeDialogs(); //close an open dialog

    $(".pagetitle").text(pageTitleTextLine[currentLocalStorageKey]);
    $(".pagetitle").css('color', pageTitleColorValue[currentLocalStorageKey]);

    $("#buttonMenu").removeClass('iconButtonMenu iconButtonMenuDemo'); //remove both to remove the existing one
    $("#buttonMenu").addClass(iconButtonMenuClass[currentLocalStorageKey]); //add the desired one
    //var testClass = iconButtonMenuClass[currentLocalStorageKey]

    $("#list1").attr("name", list1Name[currentLocalStorageKey]); //set target page name for 1st list block
};

var saveAppData = function () {
    "use strict";
    savedAppDataText = JSON.stringify(appObject);
    localStorage.appData = savedAppDataText;
    localStorage[currentLocalStorageKey] = savedAppDataText;
    //// Store the app data for multiple sessions.
    //Windows.Storage.ApplicationData.current.roamingSettings.Values["appData"] = jsonText; //<<Error - unknown property
    //ApplicationData.Current.RoamingSettings.Values["appData"] = jsonText; //<<Error - unknown property
};

function recoverPin() {
    "use strict";
    var pinDigitArray;
    var jsonText;
    if (localStorage['pin']) {
        jsonText = localStorage['pin'];
        pinDigitArray = JSON.parse(jsonText); // recover saved app data
        if (typeof (pinDigitArray) != "undefined" && pinDigitArray.length === 4) {
            return pinDigitArray; //<<*******Exit*******
        }
    }
    return [];
};

function savePin(pinDigitArray) {
    "use strict";
    var pinText = JSON.stringify(pinDigitArray);
    localStorage['pin'] = pinText;
}

function recoverAppData(key) {
    "use strict";
    var jsonText;
    appObject = { HouseObject: {}, YouObject: {}, SpouseObject: {} }; //start clean
    appObject.HouseObject.married = true; //initial default unless overwritten from saved json data
    // Recover the app data from localStorage.
    if (key) {
        if (localStorage[key]) {
            jsonText = localStorage[key];
            appObject = JSON.parse(jsonText); // recover saved app data
            return true;
        }
    }

    if (localStorage.appData) {
        jsonText = localStorage.appData;
        appObject = JSON.parse(jsonText); // recover saved app data
        return true;
    }

    ////Recover the app data from roaming settings.
    //if (ApplicationData.Current.RoamingSettings.values["appData"]) {
    //    jsonText = ApplicationData.Current.RoamingSettings.values["appData"]; //<<Error - unknown property
    //    appObject = JSON.parse(jsonText); // recover saved json app data if any
    //    return true;
    //}
    //if (exampleDataText) {
    //    appObject = JSON.parse(exampleDataText2); // recover saved json data
    //    return true;
    //}
}

function loadExampleData(exampleDataName) {
    appObject = { HouseObject: {}, YouObject: {}, SpouseObject: {} }; //start clean
    appObject.HouseObject.married = true; //initial default unless overwritten from saved json data
    appObject = JSON.parse(exampleData[exampleDataName]); // recover static example data
    return true;
}


function restoreDomData() {
    "use strict";
    var fieldVal;
    //First, clear old data in the input fields
    $(".input-element-short").val("");
    $(".input-element-you-short").val("");
    $(".input-element-spouse-short").val("");
    getSpouseData = appObject.HouseObject.married; //after recovery from saved json data
    //$("#t0married").checked = getSpouseData; //this does not work?? (jQuery = 1.8 special for Win8)
    document.getElementById("t0married").checked = getSpouseData; //this is the workaround!!
    changeDomDisplay(getSpouseData);//set up for current married or single status
    for (var ii in appObject.HouseObject) {
        if (appObject.HouseObject.hasOwnProperty(ii) && ii !== "married") {
            fieldVal = appObject.HouseObject[ii];
            fieldVal = (fieldVal == "-1") ? "" : fieldVal; //bug fix 1/2014
            $("#z0" + ii).val(fieldVal);
            //$("#z0" + ii).val(appObject.HouseObject[ii]);
        }
    }
    for (var jj in appObject.YouObject) {
        if (appObject.YouObject.hasOwnProperty(jj)) {
            fieldVal = appObject.YouObject[jj];
            fieldVal = (fieldVal == "-1") ? "" : fieldVal; //bug fix 1/2014
            $("#y1" + jj).val(fieldVal); //update both input fields of the set
            $("#z1" + jj).val(fieldVal); //update both input fields of the set
            //$("#y1" + jj).val(appObject.YouObject[jj]); //update both input fields of the set
            //$("#z1" + jj).val(appObject.YouObject[jj]); //update both input fields of the set
        }
    }
    for (var kk in appObject.SpouseObject) {
        if (appObject.SpouseObject.hasOwnProperty(kk)) {
            fieldVal = appObject.SpouseObject[kk];
            fieldVal = (fieldVal == "-1") ? "" : fieldVal; //bug fix 1/2014
            $("#z2" + kk).val(fieldVal);
            //$("#z2" + kk).val(appObject.SpouseObject[kk]);
        }
    }
    changeDomDisplay(getSpouseData); //set DOM correctly for married or single
}

//saving code snippet for later
function XXXXX() {
    var $button = $('.button').clone();
    $('.package').html($button);
}

var animateThePageSwitch = function (currentPageId, nextPageId) {
    var currentNmbr = currentPageId.slice(currentPageId.length - 1);
    var nextNmbr = nextPageId.slice(nextPageId.length - 1);
    $("#tabsOuter-" + currentNmbr).fadeOut(fadeOutTime, function () {
        $("#tabsOuter-" + nextNmbr).fadeIn(fadeInTime, function () { displaySwitching = false; }); //allow  taps again
        $("#tabsOuter-" + nextNmbr).scrollTop(0); //reset to top of scroll position
    });
};

function buildTabs(demoDivId) { //demoDivId is optional to change first tab div for demo info
    "use strict";

    //if (iOS) { // don't use native scrolling, but enable momemtum
    //    //$("#tabs-2").niceScroll({ scrollspeed: "20" });
    //    //niceScrollObj = $(".tabContent").niceScroll({scrollspeed: "8"});
    //}

    //var nice = $("#tabviewSection").niceScroll("#tabviewScroller", { cursorcolor: "#00F" });
    //$("#tabviewSection").niceScroll();
    //$("#demowrapper").niceScroll();
    //$("#tabs-1").niceScroll();
    //var myScroll = new IScroll('.demowrapper');
    //console.log(myScroll.options);

    //writeLogoHTML("filled", "logo-home", 5, null, 120, 80, 251, true, false);
    //writeLogoHTML("snapped", "logo-home", 2, null, 90, 80, 100, true, false);

    //$(".pagetitle").text(pageTitleTextLine[currentLocalStorageKey]);
    //$(".pagetitle").css('color', pageTitleColorValue[currentLocalStorageKey]);

    //if (!msTouch) { //not a win8 touch screen
    //    $("#helpnote1").text("hover over");
    //    $("#swipeHelp1").addClass("display-none");
    //    $("#swipeHelp3").removeClass("display-none");
    //}

    buildListColorBlocks($("#listSection")); //build blocks for switched demo or user data

    buildIntro($("#tabs-1")); //build some html
    buildGeneral($("#tabs-2")); //build some html
    buildSavings($("#tabs-3")); //build some html
    buildIras($("#tabs-4")); //build some html
    buildIncome($("#tabs-5")); //build some html

    //add event handlers for the appbar
    document.getElementById("userData").addEventListener("click", appBarPlanClicked, false);
    document.getElementById("savingDemo").addEventListener("click", appBarPlanClicked, false);
    document.getElementById("retiredDemo").addEventListener("click", appBarPlanClicked, false);

    document.getElementById("clearData").addEventListener("click", appBarClearDataClicked, false);
    document.getElementById("setPin").addEventListener("click", appBarSetPinClicked, false);
    document.getElementById("userCommentLink").addEventListener("click", appBarUserCommentClicked);

    //the jquery methods below do not work correctly, looping events occur.
    //$("#userData").click(appBarClicked);
    //$("#savingDemo").click(appBarClicked);
    //$("#retiredDemo").click(appBarClicked);

    //$("#helpAppIcon").click(testExampleRequest); //test the example data request
    $("#helpAppIcon").click(doShowListPage); //use list page logic for help page

    //$("#logo-left").click(saveAppData);//todo--TESTING--
    //$("#logo-right").click(recoverExampleData);//todo--TESTING--

}

var buildListColorBlocks = function (node) {
    "use strict";
    var testText = [];
    var html;
    getSwatchColor(0, 1);//use index 0,1 and then repeat
    //getSwatchColor(0, 5);//use index 0,1,2,3,4,5 and then repeat


    html = startColorBlock("list1", "tabs-1", colorIndexListNormal);
    html += listingContent(title1, "list1text"); //id="list1" is used for changing text for demos
    html += endColorBlock();
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    MYAppAppendHTML(node, html);

    html = startColorBlock("list2", "tabs-2", colorIndexListNormal);
    html += listingContent(title2);
    html += endColorBlock();
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    MYAppAppendHTML(node, html);

    html = startColorBlock("list3", "tabs-3", colorIndexListNormal);
    html += listingContent(title3);
    html += endColorBlock();
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    MYAppAppendHTML(node, html);

    html = startColorBlock("list4", "tabs-4", colorIndexListNormal);
    html += listingContent(title4);
    html += endColorBlock();
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    MYAppAppendHTML(node, html);

    html = startColorBlock("list5", "tabs-5", colorIndexListNormal);
    html += listingContent(title5);
    html += endColorBlock();
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix //node.append(html);
    MYAppAppendHTML(node, html);

    html = startColorBlock("list6", "charts", colorIndexListNormal);
    html += listingContent(title6);
    html += endColorBlock();
    //MSApp.execUnsafeLocalFunction(function () { node.append(html); }); //Win8 App fix
    MYAppAppendHTML(node, html);

    ////var hammertime2 = Hammer(element).on("touch ", showTouch);
    ////var hammertime3 = Hammer(element).on("release ", showRelease);
    //////var hammertime4 = Hammer(element).on("hold ", showRelease);

    $(".screenButton").on("click", toggleFullScreen);
    $("#listSection").hammer().on("tap", ".colortable", doShowListPage);
    $("#tabviewScroller").hammer().on("tap", ".demo-image", doDialog); //delegate event handling for a red/green demo image tap
    $("#chartGrids").hammer().on("tap", ".dataYear", doBarActivation); //delegate event handling for data table year touch
};

var isFullScreen = false; //status
var toggleFullScreen = function (e) {
    "use strict"
    event.stopPropagation();
    event.preventDefault();
    var id = e.currentTarget.id;
    isFullScreen = !isFullScreen; //toggle status
    $(".screenButton").toggleClass('display-none'); //toggle icon image
    if (isFullScreen) {
        //expand screen
    } else {
        //contract screen
    }
}

var blockBarActivation = false, barAction = 'flash';
var doBarActivation = function (e) {
    "use strict"
    event.stopPropagation();
    event.preventDefault();
    var year = e.currentTarget.innerText;
    if (blockBarActivation) {
        return false; //ignore event
    }
    blockBarActivation = year; //prevent any problem caused by rapid second tap
    //See: http://daneden.github.io/animate.css/ for documentation of this CSS animation
    $('.' + year).removeClass(barAction + ' animated').addClass(barAction + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass(barAction + ' animated');
        blockBarActivation = false;
    });
    return false;
};


var showTouch = function (e) {
    "use strict"
    //console.log("showTouch");
    var id = e.currentTarget.id;
    if (id === currentBlockId) return; //nop
    gestureActive = true;
    gestureBlockId = id;
    $("#" + id).css('background-color', getSwatchColor(colorIndexListActive)); //set active
    $("#" + currentBlockId).css('background-color', getSwatchColor(colorIndexListNormal)); //reset
    //console.log(e);
};

var showRelease = function (e) {
    "use strict"
    //console.log("showRelease");
    var id = e.currentTarget.id;
    if (gestureActive) {
        $("#" + gestureBlockId).css('background-color', getSwatchColor(colorIndexListNormal)); //reset
        $("#" + currentBlockId).css('background-color', getSwatchColor(colorIndexListActive)); //set active
    }
    gestureActive = false;
};

var restoreListBlocks = function () { //called from home page start
    "use strict"
    if (currentBlockId) { //existing selection
        var id = currentBlockId; //restore the list selection
        $("#" + id).css('background-color', getSwatchColor(colorIndexListActive)); //set active
        $("#" + id + " .colortablelisting").css('color', 'white');
        $("#" + currentPageId).removeClass("display-none"); //show the last active page
    } else {
        $("#tabsOuter-0").removeClass("display-none"); //show the default startup page
    }
    $("#list1text").text(labelOneTitles[currentLocalStorageKey]); //set label text
    $("#list1").attr("name", list1Name[currentLocalStorageKey]); //set target page name for 1st list block
};

var doShowListPage = function (e) {
    "use strict"
    e.stopPropagation();
    if (displaySwitching) { return; }; //wait
    displaySwitching = true;
    setTimeout(function () { displaySwitching = false; }, displaySwitchResetTime); //allow enough time for DOM changes to finish
    var id = e.currentTarget.id;
    if (id != "list6") {
        showListPage(id); //start page switch now
    }
    if (id === "helpAppIcon") {
        return; //skip the animation
    }
    var id = e.currentTarget.id;
    var target = $("#" + id);
    target.removeClass('pulse' + ' animated')
        .addClass('pulse' + ' animated')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            target.removeClass('pulse' + ' animated');
            if (id === "list6") {
                showListPage(id); //start page switch after the animation
            }
        });
}

var showListPage = function (id) {
    "use strict"

    //if (displaySwitching) { return; }; //wait
    //displaySwitching = true;
    //setTimeout(function () { displaySwitching = false; }, displaySwitchResetTime); //allow enough time for DOM changes to finish

    var pageId = $("#" + id).attr("name");
    var errorMsg, errorNode;

    gestureActive = false; //this is a tap

    if (pageId === "charts") {
        var errorMsg = switchToChartsPage();
        if (!errorMsg) { //there is no error report about missing data
            return; //charts are presented
        }

        //var errorMsg = prepareChartData(); //do all the math with input data
        //if (!errorMsg) { //there is no error report about missing data
        //    ////currentPageScrollPosition = document.getElementById(currentPageId).scrollTop; //get scroll position
        //    ////currentPageScrollPosition = $("#" + currentPageId).scrollTop; //get scroll position
        //    ////WinJS.Navigation.navigate('/pages/charts/charts.html', null);
        //    switchToChartsPage();
        //    return;
        //}

        errorNode = $("#tabs-6");
        buildReport(errorNode, errorMsg); //build the html showing error report
        pageId = "tabs-6"; //switch to new page id
    }
    if (currentBlockId !== id) {
        if (currentBlockId) {
            $("#" + currentBlockId).css('background-color', getSwatchColor(colorIndexListNormal)); //reset
            $("#" + currentBlockId + " .colortablelisting").css("color", "#34495e"); // Wet asphalt
        }
        currentBlockId = id;
        $("#" + id).css('background-color', getSwatchColor(colorIndexListActive)); //set active
        $("#" + id + " .colortablelisting").css('color', 'white');
        //animate the page change

        //var currentNmbr = currentPageId.slice(currentPageId.length - 1);
        //var nextNmbr = pageId.slice(pageId.length - 1);
        //animateThePageSwitch(currentNmbr, nextNmbr);

        animateThePageSwitch(currentPageId, pageId);
        currentPageId = pageId;
        closeDialogs(); //close an open dialog
    }
};

var buildPageTitle = function (title) {
    "use strict"
    var html = [];
    var bgColor = getSwatchColor(18);
    html.push('<div class="tabContentTitle" style="background-color:' + bgColor + ';">\n');
    //add some blanks after the title text so that the text-align:center styling looks correct to my eye
    html.push('<h2 class="page-title" style="color:white">' + title + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>\n');
    html.push('</div>\n');
    return html.join('');
};

var startMarriedColorBackground = function () {
    "use strict"
    var bgColor = getSwatchColor(); //next color in sequence from range
    return ('<div class="colorbackground married" style="background-color:' + bgColor + ';">\n');
};

var startColorBackground = function () {
    "use strict"
    var bgColor = getSwatchColor(); //next color in sequence from range
    return ('<div class="colorbackground" style="background-color:' + bgColor + ';">\n');
};

var endColorBackground = function () {
    "use strict"
    return ('</div>\n');
};

var startColorBlock = function (id, name, colorindex) {
    "use strict"
    var bgColor = getSwatchColor(colorindex);
    return ('<table id="' + id + '" name="' + name + '" class="colortable" style="background-color:' + bgColor + ';"><tbody><tr><td class="colortabledata">\n');
};

var endColorBlock = function () {
    "use strict"
    return '</td></tr></tbody></table>\n';
}

var listingContent = function (listing, id) {
    "use strict"
    if (id) { //id is used for changing text for demos
        return '<span id="' + id + '" class="colortablelisting">' + listing + '</span></td><td> <span><i class="colortableicon fa fa-angle-right"></span>';
    } else {
        return '<span class="colortablelisting">' + listing + '</span></td><td> <span><i class="colortableicon fa fa-angle-right"></span>';
    }
};

var buildCheckboxSection = function (id, getSpouseData) {
    "use strict";
    var output;
    var htmlStack = [];
    htmlStack.push('<div id="marriedCheckbox">\n');
    htmlStack.push('<span class="left-text">Married:</span>\n');
    if (getSpouseData) { //married - show Checked
        htmlStack.push('<input type="checkbox" value="None" id="' + id + '" name="' + id + '" onClick="doClick(event)" checked />\n');
    } else { //single - show unChecked
        htmlStack.push('<input type="checkbox" value="None" id="' + id + '" name="' + id + '" onClick="doClick(event)" />\n');
    }
    htmlStack.push('<span class="right-text married">Yes</span><span class="right-text single display-none">No</span>\n');
    htmlStack.push('</div>\n');
    output = htmlStack.join('');
    return output;
};

var buildReport = function (node, msg) {
    "use strict";
    var htmlStack = [];
    htmlStack.push('<div id="errorReport">\n');
    htmlStack.push(msg);
    htmlStack.push('</div>\n');
    //MSApp.execUnsafeLocalFunction(function () { node.html(htmlStack.join('')); }); //Win8 App fix //node.append(html);
    MYAppInsertHTML(node, htmlStack.join(''));
};


var buildExtraSection = function (extraData) {
    "use strict";
    var htmlStack = [];
    htmlStack.push('<div class="tabData input-introduction">\n');
    //htmlStack.push('<p class="input-desc-text">' + extraData + '</p>\n');
    htmlStack.push('<p>' + extraData + '</p>\n');
    htmlStack.push('</div>\n');
    return htmlStack.join('');
};

var buildSpouseInputSection = function (sectionData) {
    "use strict";
    //Special html layout for spouse data only
    var testingInfo = testCode + testPrompt; //use in the input element for application's test of valid input
    var houseData = sectionData.houseData || false;
  var dataName = sectionData.dataName;
  var inputExplaination = sectionData.inputExplaination;
  var promptText = sectionData.promptText;
  var testCode = sectionData.testCode;
  var testPrompt = sectionData.testPrompt;
    //var idValue1 = (houseData ? "0" : "1") + dataName;
    var idValue2 = "2" + dataName; //spouse id is the one used
    var errorid = "x" + dataName;
    var htmlStack = [];

    htmlStack.push('<table class="tabInput married" role="presentation" border="0">\n');
    htmlStack.push('<tr>\n');
    htmlStack.push('<td style="width: 50px" >\n');
    htmlStack.push('</td>\n');
    htmlStack.push('<td style="width: 220px" >\n');
    htmlStack.push('<p class="input-prompt-text-single">' + promptText + '</p>\n');
    htmlStack.push('</td>\n');
    htmlStack.push('<td style="width: 160px" >\n');
    htmlStack.push('<input type="text" id="z' + idValue2 + '" style="width: 100px; height: 30px" class="input-element-short" name="' + testingInfo + '" onFocus="doFocus(event)" onBlur="doBlur(event)"/>\n');
    htmlStack.push('</td>\n');
    htmlStack.push('</tr>\n');
    htmlStack.push('</table>\n');
    htmlStack.push('<p class="tabDataError ' + errorid + ' display-none error-text-spread">INSERT ERROR MSG</p>\n');
    htmlStack.push('<p class="tabData married input-desc-text">' + inputExplaination + '</p>\n');
    return htmlStack.join('');
};

var buildMarriedInputSection = function (sectionData) {
    "use strict";
    var dataName = sectionData.dataName;
    var inputExplaination = sectionData.inputExplaination;
    var promptText = sectionData.promptText;
    var testCode = sectionData.testCode;
    var testPrompt = sectionData.testPrompt;
    var testingInfo = testCode + testPrompt; //use in the input element for application's test of valid input
    var houseData = sectionData.houseData || false;
    var idValue1 = (houseData ? "0" : "1") + dataName;
    var idValue2 = "2" + dataName;
    var errorid = "x" + dataName;
    var htmlStack = [];

    htmlStack.push('<table class="tabInput married" role="presentation" border="0">\n');
    htmlStack.push('<tr class="married">\n');
    htmlStack.push('<td style="width: 430px">\n');
    htmlStack.push('<p class="input-prompt-text-married">' + promptText + '</p>\n');
    htmlStack.push('</td>\n');
    htmlStack.push('</tr>\n');
    htmlStack.push('<tr class="married">\n');
    htmlStack.push('<td>\n');
    htmlStack.push('<span class="input-label-you">You: </span>\n');
    htmlStack.push('<span>\n');
    htmlStack.push('<input type="text" id="z' + idValue1 + '" style="width: 100px; height: 30px" class="input-element-you-short" name="' + testingInfo + '" onFocus="doFocus(event)" onBlur="doBlur(event)"/>\n');
    htmlStack.push('</span>\n');
    htmlStack.push('<span class="input-label-spouse">Spouse: </span>\n');
    htmlStack.push('<span>\n');
    htmlStack.push('<input type="text" id="z' + idValue2 + '" style="width: 100px; height: 30px" class="input-element-spouse-short" name="' + testingInfo + '" onFocus="doFocus(event)" onBlur="doBlur(event)"/>\n');
    htmlStack.push('</span>\n');
    htmlStack.push('</td>\n');
    htmlStack.push('</tr>\n');
    htmlStack.push('</table>\n');

    htmlStack.push('<p class="tabDataError ' + errorid + ' display-none error-text-spread">INSERT ERROR MSG</p>\n');
    htmlStack.push('<p class="tabData married input-desc-text">' + inputExplaination + '</p>\n');
    return htmlStack.join('');
};

var buildInputSection = function (sectionData) {
    "use strict"
    var dataName = sectionData.dataName;
    var inputExplaination = sectionData.inputExplaination;
    var promptText = sectionData.promptText;
    var testCode = sectionData.testCode;
    var testPrompt = sectionData.testPrompt;
    var testingInfo = testCode + testPrompt; //use in the input element for application's test of valid input
    var houseData = sectionData.houseData || false;
    var idValue1 = (houseData ? "0" : "1") + dataName;
    var idValue2 = "2" + dataName;
    var errorid = "x" + dataName;
    var htmlStack = [];

    htmlStack.push('<table class="tabInput" role="presentation" border="0">\n');
    if (houseData) {
        htmlStack.push('<tr>\n');
    } else {
        htmlStack.push('<tr class="single">\n');
    }
    htmlStack.push('<td style="width: 50px" >\n');
    htmlStack.push('</td>\n');
    htmlStack.push('<td style="width: 220px" >\n');
    htmlStack.push('<p class="input-prompt-text-single">' + promptText + '</p>\n');
    htmlStack.push('</td>\n');
    htmlStack.push('<td style="width: 160px" >\n');

    if (houseData) {
        htmlStack.push('<input type="text" id="z' + idValue1 + '" style="width: 80px; height: 30px" class="input-element-short" name="' + testingInfo + '" onFocus="doFocus(event)" onBlur="doBlur(event)"/>\n');
        htmlStack.push('</td>\n');
        htmlStack.push('</tr>\n');
        htmlStack.push('</table>\n');
    } else {
        //use the special id prefix of "y" to identify the second of the "you" input field pairs
        htmlStack.push('<input type="text" id="y' + idValue1 + '" style="width: 80px; height: 30px" class="input-element-short" name="' + testingInfo + '" onFocus="doFocus(event)" onBlur="doBlur(event)"/>\n');
        htmlStack.push('</td>\n');
        htmlStack.push('</tr>\n');
        htmlStack.push('<tr class="married">\n');
        htmlStack.push('<td style="width: 430px">\n');
        htmlStack.push('<p class="input-prompt-text-married">' + promptText + '</p>\n');
        htmlStack.push('</td>\n');
        htmlStack.push('</tr>\n');
        htmlStack.push('<tr class="married">\n');
        htmlStack.push('<td>\n');
        htmlStack.push('<span class="input-row-double">\n');
        htmlStack.push('<span class="input-label-you">You: </span>\n');
        htmlStack.push('<span>\n');
        htmlStack.push('<input type="text" id="z' + idValue1 + '" style="width: 80px; height: 30px" class="input-element-you-short" name="' + testingInfo + '" onFocus="doFocus(event)" onBlur="doBlur(event)"/>\n');
        htmlStack.push('</span>\n');
        htmlStack.push('<span class="input-label-spouse">Spouse: </span>\n');
        htmlStack.push('<span>\n');
        htmlStack.push('<input type="text" id="z' + idValue2 + '" style="width: 80px; height: 30px" class="input-element-spouse-short" name="' + testingInfo + '" onFocus="doFocus(event)" onBlur="doBlur(event)"/>\n');
        htmlStack.push('</span>\n');
        htmlStack.push('</span>\n');
        htmlStack.push('</td>\n');
        htmlStack.push('</tr>\n');
        htmlStack.push('</table>\n');
    }
    htmlStack.push('<p class="tabDataError ' + errorid + ' display-none error-text-spread">INSERT ERROR MSG</p>\n');
    htmlStack.push('<p class="tabData input-desc-text">' + inputExplaination + '</p>\n');
    return htmlStack.join('');
};

var getSwatchColor = (function () {
    //http://designmodo.github.io/Flat-UI/
    //var colorSwatches = {
    //    //-----------------Index---
    //    "Sun flower": "#f1c40f",
    //    "Orange": "#f39c12",
    //    "Carrot": "#e67e22",
    //    "Pumpkin": "#d35400",
    //    "Alizarin": "#e74c3c",
    //    "Pomegranate": "#c0392b",
    //    //------------------Input---
    //    "Turquoise": "#1abc9c",
    //    "Green sea": "#16a085",
    //    "Emerland": "#2ecc71",
    //    "Nephritis": "#27ae60",
    //    "Peter river": "#3498db",
    //    "Belize hole": "#2980b9",
    //    "Amethyst": "#9b59b6",
    //    "Wisteria": "#8e44ad",
    //    //------------------Intro---
    //    "Clouds": "#ecf0f1",
    //    "Light Silver": "#D8DBDF",
    //    //"Silver": "#bdc3c7",
    //    "Concrete": "#95a5a6",
    //    "Asbestos": "#7f8c8d",
    //    "Wet asphalt": "#34495e",
    //    "Midnight blue": "#2c3e50",
    //}
    //var colorSwatchKeys = Object.keys(colorSwatches); //put the keys into an array
    var nextIndex = 0;
    var firstIndex = 0;
    var stopIndex = colorSwatchKeys.length;

    return function (nn, pp) { //option to specify desired color by index number, or within a range
        var jj;
        if (nn >= 0 && pp) { //set range values when two params are specified, then call with no params
            nextIndex = nn;
            firstIndex = nn;
            stopIndex = (pp+1 > colorSwatchKeys.length ? colorSwatchKeys.length : pp+1);
            return;
        }
        jj = nn >= 0 ? nn : nextIndex++; //call with one param to specify a color, else range is used
        if (nextIndex === stopIndex) nextIndex = firstIndex;
        return colorSwatches[colorSwatchKeys[jj]];
    }
}());

var menuOpen = false; //global flag
function doDialog(event) {
    //alert("doDialog menuOpen=" + menuOpen);
    if (menuOpen) return; //reset to false is delayed
    closeDialogs(); //close the open dialog
    setTimeout(showDialog(event), 1); //allow DOM to settle
}

function closeDialogs() {
    //alert("closeDialogs menuOpen=" + menuOpen);
    //close an open dialog
    if ($("#dialog").size() === 0) { //element is not present
        return;
    }
    if ($("#dialog").dialog("isOpen")) {
        $("#dialog").dialog("close");
    }
}

function showDialog(event) {
    var node = event.target;
    var id = node.id;
    var $node = $('#'+id)
    var title = $node.attr("title");
    var srcname = $node.attr("src");
    var html = ""
    html += '<div id="dialog"';
    html += ' title="' + title + '"';
    html += ' data-options="iconCls:\'icon-save\'"';
    html += ' style="width:400px;height:200px;padding:2px"';
    html += '>';
    html += ' <img id="' + id + id + '" src="' + srcname + '" />';
    html += '</div>'
    MYAppPrependHTML($(document.body), html);
    var img = $('#' + id + id); //the image itself
    img.attr({ width: 700, height: 370 }); //set image in the dialog to standard size
    $("#dialog").dialog({
        closeText: 'Close',
        autoOpen: false,
        width: 700 + 16,
        height: 370 + 60,
        resizable: false,
        position: { my: "left bottom", at: "left+26px bottom-30px", of: window },
        close: function (event, ui) {$(this).dialog('destroy').remove()} //recreate element again next time
    });
    $("#dialog").dialog("open");

    ////http://stackoverflow.com/questions/318630/get-real-image-width-and-height-with-javascript-in-safari-chrome#3192577
    //var img = $('#' + id + id); // Get my img elem
    //var pic_real_width, pic_real_height;
    //$("<img/>") // Make in memory copy of image to avoid css issues
    //    .attr("src", $(img).attr("src"))
    //    .load(function () {
    //        pic_real_width = this.width;   // Note: $(this).width() will not
    //        pic_real_height = this.height; // work for in memory images.
    //        $("#dialog").dialog({
    //            closeText: 'Close me',
    //            autoOpen: false,
    //            width: pic_real_width + 25, // 770,
    //            height: pic_real_height + 70, //470
    //        });
    //        $("#dialog").dialog("open");
    //    });
}

function doFocus(event) {
    "use strict";
    var node1 = event.currentTarget;
    var id = event.currentTarget.id;
    var rootName = id.substr(2); //used as identifier class name in DOM
    $("#" + id).addClass("focus");
    //$(node1).css("color", "black");
}

function doBlur(event) {
    "use strict";
    var node1 = event.currentTarget;
    var id = event.currentTarget.id;
    var dataId = id.substr(1, 1); //db object identifier number
    var rootName = id.substr(2); //app value name; also used as an identifier class name in DOM
    var errorid = "x" + id.substr(2);
    var testingInfo = event.currentTarget.name;
    var val1 = event.currentTarget.value;
    //var dataValue = $(node1).val();
    var dataValue = $("#" + id).val();// ?? does not always work ??
    var verifiedResult = "";
    var verifyObject = {
        value: dataValue,
        name: id,
        editCode: testingInfo.substr(0, 1),
        promptText: testingInfo.substr(1),
        errorMessage: "Error message not available",
    };
    var dataObject = {}; //object module holding app data values
    if (dataId === "0") {
        dataObject = appObject.HouseObject;
    } else if (dataId === "1") {
        dataObject = appObject.YouObject;
    } else if (dataId === "2") {
        dataObject = appObject.SpouseObject;
    } else { //should not happen: bomb it now
        alert("doBlur() failed, with dataId === " + dataId);
    }
    if (dataValue) { // data was entered
        verifiedResult = validateInput(verifyObject);
        if (!verifiedResult) { //data entry error, handled below
            errors[id] = true; //this input id has an error
            $("." + errorid).removeClass("display-none"); //show error field
            $("#" + id).css("color", "red");
            //$("." + errorid).html(verifyObject.errorMessage);
            MYAppInsertHTML($("." + errorid), verifyObject.errorMessage);
        } else { //good data entry
            $("#" + id).removeClass("focus");
            $("#" + id).css("color", "black");
            if (dataId === "1") { //input is for the "you" object
                $("#y1" + rootName).val(verifiedResult); //set both input fields with verified data
                $("#z1" + rootName).val(verifiedResult); //set both input fields with verified data
            } else {
                $("#" + id).val(verifiedResult); //set the one input field with verified data
            }
            dataObject[rootName] = verifiedResult; //save verified data string in db for app use
            saveAppData(); //save json text string to local storage
        }
    }
    if (!dataValue) { //no input data exists
        $("#" + id).removeClass("focus");
        $("#" + id).css("color", "black");
        delete dataObject[rootName]; //data item was set to null by user
        saveAppData(); //save json text string to local storage
    }
    if (!dataValue || verifiedResult) { //no input data error
        errors[id] = false;
        if (!(errors["z0" + rootName] || errors["y1" + rootName] || errors["z1" + rootName] || errors["z2" + rootName])) {  //no remaining error alerts on this input field
            $("." + errorid).addClass("display-none"); //hide error message
        }

        //if ("s" === id.substr(0, 1)) { //single user - not married
        //    $("." + id).addClass("display-none"); //hide error message
        //} else {
        //    $("." + id).addClass("visibility-hidden");
        //    if (!(errors["h1" + rootName] || errors["w2" + rootName])) {  //no remaining error alerts
        //        $("." + rootName).addClass("display-none"); //hide error field table
        //    }
        //}
    }
}

function doClick(event) { //onClick from "Married?" check box
    "use strict";
    var id = event.currentTarget.id;
    var val0 = event.currentTarget.name;
    var val1 = event.currentTarget.value;
    var val3 = $("#" + id).prop('checked');
    if (id === "t0married") {
        appObject.HouseObject.married = event.currentTarget.checked;
        getSpouseData = appObject.HouseObject.married; //GLOBAL
        saveAppData(); //save json text string to local storage
        changeDomDisplay(getSpouseData);
    }
}

function changeDomDisplay(getSpouseData) {
    "use strict";
    if (getSpouseData) { //married - show inputs for you and spouse
        $(".single").addClass("display-none");
        $(".married").removeClass("display-none");
    } else { //single - show inputs for you only
        $(".single").removeClass("display-none");
        $(".married").addClass("display-none");
    }
    if (errors) { //remove outstanding error alerts
        for (var kk in errors) { //for all input ids with an error posted
            if (errors.hasOwnProperty(kk)) {

                //if (typeof errors[kk] === "number") { //this is the rootname count of errors
                //    $("." + kk).addClass("display-none"); //hide error field table
                //} else {
                //    if ("s" === kk.substr(0, 1)) { //single user - not married
                //        $("." + kk).addClass("display-none");
                //    } else {
                //        $("." + kk).addClass("visibility-hidden");
                //        $("." + kk.substr(2)).addClass("display-none"); //hide error field table
                //    }
                //    $("#" + kk).css("color", "black");
                //    $("#" + kk).val("");
                //}

                $("#" + kk).css("color", "black");
                $("#" + kk).val("");
                $(".x" + kk.substr(2)).addClass("display-none"); //hide error message
                delete errors[kk];
            }
        }
    }
}

function assert(condition, message) {
    if (!condition) {throw message || "Assertion failed";}
}

//if ($("#carousel").width() > 400) { throw "Width is " + $("#carousel").width(); } //assert assertion
